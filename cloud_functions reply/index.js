/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const request = require('request');

const msg_format_module = require('./flex_message_format');

exports.receive_message = (req, res) => {
  const message = req.query.message || req.body.message || 'Hello World!';
  //token = body['events'][0]['replyToken']#replyTokenの値取得
  console.log(req.body);
  if (req.body.events) {
    const token = req.body.events[0].replyToken;
    console.log(req.body.events[0].source);
    console.log("[LOG] token : " + token);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer j8ohRkKdBvzs78bh8AR91vRZ1eisK+/63sp9VxqGoDbCNuJ8BQD912zzU6nIe7UFioKRDBgihOdriZ2JrCQe0UIZgsv2usXfVaZ2w328+TLaS5gCguYaanFcXtbfyKvP6rAlJ1yKlyeWeSC8O4qxro9PbdgDzCFqoOLOYbqAITQ='
    };

    // バブルの中身を設定
    const bubble_objs = [
      msg_format_module.bubble_template("AAA", ["google drive はいいぞー", "でも重いぞー"]),
      msg_format_module.bubble_template("BBB", "OneDrive もええぞー"),
      msg_format_module.bubble_template("CCC", "Googleフォトには感謝しかないです...")
    ];

    let option = {
      "url": "https://api.line.me/v2/bot/message/reply",
      "method": "POST",
      "headers": headers,
      "json": msg_format_module.rep_carousel_msg(token, bubble_objs)
    };

    request.post(option, function (error, response, body) {
      if (!error) {
        console.log("[LOG] status code : ", response.statusCode);
      } else {
        console.log("[ERROR]" + error);
      }
    });
  }

  res.status(200).send(message);
};
