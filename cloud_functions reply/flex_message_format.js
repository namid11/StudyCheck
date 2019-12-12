
// root message format
var root_msg_format = function (token, msgs) {
  return {
    'replyToken': token,
    'messages': msgs
  };
}


// flex message 用のテンプレート
var flex_base_template = function (contents, altText = "Flex Message（バグやで）") {
  const flex = {
    'type': 'flex',
    'altText': altText,
    'contents': contents
  }

  return [flex];
}


// ただのテキストメッセージ
var rep_text_msg = function (token, texts) {
  const data = [];
  if (Array.isArray(texts)) {
    // 配列の場合
    for (var value in texts) {
      data.push({
        'type': 'text',
        'text': value
      });
    }
  } else {
    data.push({
      'type': 'text',
      'text': texts
    });
  }

  return root_msg_format(token, data);
}


// カローセルメッセージ
var rep_carousel_msg = function (token, bubbles) {
  const carousel = {
    'type': 'carousel',
    'contents': bubbles
  };

  return root_msg_format(token, flex_base_template(carousel));
}


// テキストテンプレート
var text_msg_template = function (texts) {
  const data = [];
  if (Array.isArray(texts)) {
    // 配列の場合
    for (var value of texts) {
      data.push({
        'type': 'text',
        'text': value,
        "size": "md",
        "align": "start",
        "margin": "sm"
      });
    }
  } else {
    data.push({
      'type': 'text',
      'text': texts,
      "size": "md",
      "align": "start",
      "margin": "sm"
    });
  }

  return data;
}


// リスト系テンプレート
var text_list_template = function (texts) {
  var text_templates = text_msg_template(texts);
  const data = [];

  for (let index = 0; index < text_templates.length; index++) {
    const text_temp = text_templates[index];
    data.push({
      'type': 'box',
      'layout': 'baseline',
      'contents': [
        {
          'type': 'icon',
          'url': 'https://storage.googleapis.com/studycheck_storage/check_.png'
        },
        text_temp
      ]
    })
  }

  return data;
}


// バブルテンプレート
var bubble_template = function (header = "HEADER", texts = "Text Message") {
  const bubble = {
    "type": "bubble",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": header,
          "color": "#ffffff",
          "align": "center",
          "size": "xl"
        }
      ],
      "backgroundColor": "#ee5253",
      "paddingAll": "6px"
    },
    "hero": {
      "type": "image",
      "url": "https://storage.googleapis.com/studycheck_storage/english_hero.png",
      "size": "full",
      "aspectRatio": "4:3",
      "aspectMode": "cover"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": text_list_template(texts)
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "button",
          "style": "link",
          "height": "sm",
          "action": {
            "type": "uri",
            "label": "完了報告",
            "uri": "https://linecorp.com"
          }
        }
      ],
      "backgroundColor": "#dfe6e9",
      "paddingAll": "2px",
      "flex": 0
    }
  };

  return bubble;
}





// エクスポート
module.exports = {
  rep_text_msg: rep_text_msg,
  rep_carousel_msg: rep_carousel_msg,
  bubble_template: bubble_template
}

