
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
          'url': 'https://storage.googleapis.com/studycheck_bucket_ex/check_.png'
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
    "size": "kilo",
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
      "url": "https://storage.googleapis.com/studycheck_bucket_ex/english_hero.png",
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


// --------- クラスモジュール ------------


// FlexMessageの根源
class RootModel {
  static format(token, vMsgList) {
    return {
      'replyToken': token,
      'messages': vMsgList.format()
    }
  }
}


// 複数メッセージのモデル
class MsgListModel {
  constructor() {
    this.msg_list = [];
  }

  // Msg追加オブジェクト
  set addMsg(vMsgModel) {
    this.msg_list.push(vMsgModel.format());
  }

  // MsgList追加オブジェクト
  set setMsgList(vMsgModel_List) {
    for (const msgModel of vMsgModel_List) {
      this.msg_list.push(msgModel.format());
    }
  }

  format() {
    return this.msg_list;
  }
}

// メッセージベースクラス
class MsgModel {
  constructor() {
  }

  format() {
    return null;
  }
}


// ---------------- メッセージ -----------------
// カルーセルモデル
class CarouselModel extends MsgModel {
  constructor(bubble_list=null) {
    super();
    this.bubble_list = bubble_list;
  }

  set setBubbleList(bubble_list) {
    this.bubble_list = bubble_list;
  }

  format() {
    return {
      'type': 'carousel',
      'contents': this.bubble_list
    }
  }
}

// バブルモデル
class BubbleModel extends MsgModel {
  constructor(vHeader=null, vHero=null, vBody=null, vFooter=null) {
    super();
    this.vHeader = vHeader;
    this.vHero = vHero;
    this.vBody = vBody;
    this.vFooter = vFooter;
  }

  format(size="kilo") {
    return {
      "type": "bubble",
      "size": size,
      "backgroundColor": "#dfe6e9",
      "paddingAll": "2px",
      "flex": 0,
      "header": this.vHeader.format(),
      "hero": this.vHero.format(),
      "body": this.vBody.format(),
      "footer": this.vFooter.format()
    }
  }
}

// ただのテキストモデル
class TextModel extends MsgModel {
  constructor(text="", size="md", color="#000", align="start", margin="sm") {
    super();
    this.msg_text = text;
    this.size = size;
    this.color = color;
    this.align = align;
    this.margin = margin;
  }

  set setArgs(text=null, size=null, color=null, align=null, margin=null) {
    if (text) {
      this.msg_text = text;
    }
    if (size) {
      this.size = size;
    }
    if (color) {
      this.color = color;
    }
    if (align) {
      this.align = align;
    }
    if (margin) {
      this.margin = margin;
    }
  }

  format() {
    return {
      'type': 'text',
      'text': this.msg_text,
      "size": this.size,
      "color": this.color,
      "align": this.align,
      "margin": this.margin
    }
  }
}

// シャレたテキストモデル
class TextLineModel extends TextModel {
  constructor(text="") {
    super(text);
  }

  set setMsgText(text) {
    super.setMsgText(text);
  }

  format() {
    return {
      'type': 'box',
      'layout': 'baseline',
      'contents': [
        {
          'type': 'icon',
          'url': 'https://storage.googleapis.com/studycheck_bucket_ex/check_.png'
        },
        super.format()
      ]
    };
  }
}

// ボタンモデル
class ButtonModel extends MsgModel {
  constructor(label, action_url, style="link", height="sm", ) {
    super();
    this.label = label;
    this.action_url = action_url;
    this.style = style;
    this.height = height;
  }

  format() {
    return {
      "type": "button",
      "style": this.style,
      "height": this.height,
      "action": {
        "type": "uri",
        "label": this.label,
        "uri": this.action_url
      }
    }
  }
}


// --------------- コンポーネント（メッセージ構成要素）---------------
class ComponentModel {
  constructor(type, layout=null, bgColor=null) {
    this.type = type;
    this.layout = layout;
    this.backgroundColor = bgColor;
  }

  format() {
    return null;
  }
}

// ヘッダーモデル
class HeaderModel extends ComponentModel {
  constructor(header_text="", layout="vertical", bgColor="#333", padding="6px") {
    super("box", layout, bgColor);
    this.vText = new TextModel(text=header_text, align="center");
    this.padding = padding;
  }

  format() {
    return {
      "type": this.type,
      "layout": this.layout,
      "contents": [this.vText.format()],
      "backgroundColor": this.backgroundColor,
      "paddingAll": this.padding
    }
  }
}

// ImageHeroモデル
class HeroImageModel extends ComponentModel {
  constructor(img_url, size="full", aspectRatio="4:3", aspectMode="cover") {
    super(type="image")
    this.img_url = img_url;
    this.size = size;
    this.aspectRatio = aspectRatio;
    this.aspectMode = aspectMode;
  }

  format() {
    return {
      "type": this.type,
      "url": this.img_url,
      "size": this.size,
      "aspectRatio": this.aspectRatio,
      "aspectMode": this.aspectMode
    }
  }
}

// Bodyモデル
class BodyModel extends ComponentModel {
  constructor(layout="vertical", vMsgListModel=null) {
    super(type="box", layout=layout);
    this.vContentsModel = vMsgListModel;
  }

  set setContents(vMsgModel) {
    this.vContentsModel = vMsgModel;
  }

  format() {
    return {
      "type": this.type,
      "layout": this.layout,
      "contents": this.vContentsModel.format()
    }
  }
}

class FooterModel extends ComponentModel {
  constructor(type="box", layout="vertical", bgColor="#dfe6e9", vMsgModel=null, padding="2px") {
    super(type, layout, bgColor);
    this.vContents = vMsgModel;
    this.padding = padding;
  }

  format() {
    return {
      "type": this.type,
      "layout": this.layout,
      "spacing": "sm",
      "backgroundColor": this.backgroundColor,
      "paddingAll": "2px",
      "flex": 0,
      "contents": this.vContents.format()
    }
  }
}


// エクスポート
module.exports = {
  rep_text_msg: rep_text_msg,
  rep_carousel_msg: rep_carousel_msg,
  bubble_template: bubble_template,
  RootModel: RootModel,
  MsgListModel: MsgListModel,
  MsgModel: MsgModel,
  CarouselModel: CarouselModel,
  BubbleModel: BubbleModel,
  TextModel: TextModel,
  TextLineModel: TextLineModel,
  ButtonModel: ButtonModel,
  ComponentModel: ComponentModel,
  HeaderModel: HeaderModel,
  HeroImageModel: HeroImageModel,
  BodyModel: BodyModel,
  FooterModel: FooterModel
}

