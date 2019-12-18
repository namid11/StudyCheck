/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const request = require('request');
const { RootModel, MsgListModel, MsgModel, CarouselModel, BubbleModel, TextModel, TextLineModel, ButtonModel, ComponentModel, HeaderModel, HeroImageModel, BodyModel, FooterModel } = require('./flex_message_format');


// Called Function
exports.pushMessage = (req, res) => {
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


    // Bubble作成
    const bubbles_data = {
      "英語": {
        body: [
          "復習ノート p.13",
          "英単語"
        ],
        bg_color: "#ee5253",
        image_url: "https://storage.googleapis.com/studycheck_bucket_ex/english_hero.png",
        button_url: "#"
      },
      "数学": {
        body: [
          "内申対策テスト p.15"
        ],
        bg_color: "#0984e3",
        image_url: "https://storage.googleapis.com/studycheck_bucket_ex/math_hero.png",
        button_url: "#"
      }
    }


    // FlexMessage作成
    const msg_list_obj = new MsgListModel();
    const carousel_msg = new CarouselModel();
    const bubble_list = []
    for (const key in bubbles_data) {
      if (bubbles_data.hasOwnProperty(key)) {
        const element = bubbles_data[key];

        // Body内Content作成
        const bodyCont = new MsgListModel();
        for (const bodyStr of element.body) {
          bodyCont.addMsg(new TextLineModel(bodyStr)) 
        }

        // BubbleModel構築
        const bubble = new BubbleModel(
          vHeader=new HeaderModel(header_text=key, bgColor=element.bg_color),
          vHero=new HeroImageModel(img_url=element.image_url),
          vBody=new BodyModel(vMsgModel=bodyCont),
          vFooter=new FooterModel(vMsgModel=new ButtonModel(label="完了報告", action_url="#"))
        )

        bubble_list.push(bubble);
      }
    }
    carousel_msg.setBubbleList(bubble_list);
    msg_list_obj.addMsg(carousel_msg);

    // POSTデータ作成
    let option = {
      "url": "https://api.line.me/v2/bot/message/reply",
      "method": "POST",
      "headers": headers,
      "json": RootModel.format(token, msg_list_obj)
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
