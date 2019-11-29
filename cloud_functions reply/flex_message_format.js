
// root message format
var root_msg_format = function(token, msgs) {
  return {
    'replyToken': token,
    'messages': msgs
  };
}


// flex message 用のテンプレート
var flex_base_template = function(contents, altText="Flex Message（バグやで）") {
  const flex = {
    'type': 'flex',
    'altText': altText,
    'contents': contents
  }

  return [flex];
}


// ただのテキストメッセージ
var rep_text_msg = function(token, texts) {
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
var rep_carousel_msg = function(token, bubbles) {
  const carousel = {
    'type': 'carousel',
    'contents': bubbles
  };

  return root_msg_format(token, flex_base_template(carousel));
}

// バブルテンプレート
var bubble_template = function(header="HEADER", text="Text Message") {
  const bubble = {
    'type': 'bubble',
    'size': 'mega',
    'header': {
      'type': 'box',
      'layout': 'vertical',
      'contents': [
        {
          'type': 'text',
          'text': header,
          'color': '#ffffff',
          'align': 'start',
          'gravity': 'center'
        }
      ],
      'backgroundColor': '#ee5253',
      "paddingAll": "12px",
    },
    'body': {
      'type': 'box',
      'layout': 'vertical',
      'contents': [
        {
          'type': 'text',
          'text': text,
          'color': '#222f3e',
          'size': 'md',
          'wrap': true
        }
      ],
      'spacing': 'md',
      'paddingAll': '12px'
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

