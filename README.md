## dialog

I'm just a dialog, that's all.

## Compatibility

Chrome 1+ / Firefox 10+ / Opera 9+ / IE 8+

## Feature

- feature 1

## Usage

#### direct initialization

> Notice: parameter optObj can be set as either an object or a function with a return value of an object

```html
<div id="dialog-1"></div>

<script>
	var dialogObj = $("#dialog-1").dialog(optObj);
</script>
```

#### event-trigger initialization
> Notice: dialog object and bind event type can be obtained by trigger's data() as follows:

```html
<a id="initLink" href="#">init a dialog</a>

<script>
	var $initLink = $("#initLink");
	var type = "click";
	$initLink.bindDialog(type, optObj);
	// get dialog object
	var dialogObj = $initLink.data("dialogObj");
	// unbind dialog event
	var etype = $initLink.data("etype");
	$("#initLink").unbindDialog(etype);
</script>
```

### 参数说明 ###

#### optObj
| 参数        | 类型 | 默认值        | 描述 |
| ------------- |:-----|:--------:| -----:|
| width     | `Number` | 100 | dialog宽度 |
| height     | `Number` | 100 | dialog高度 |
| position     | `String` | "absolute" | dialog定位方式 |
| modal     | `Number` | 0 | 是否是模态 |
| draggable     | `Number` | 1 | 是否可以拖动 |
| tpl    | `Object` | {	head: headTplStr,	content: contentTplStr, foot: footTplStr } | 头部、内容区、尾部分别对应的tpl |
| initOnce    | `Number` | 0 | 使用事件触发方式初始化时控制是只初始化一次还是每次触发都初始化一个新的dialog对象 |
| onComplete    | `Function` | - | 初始化结束时可以使用的回调 |
| debug    | `Number` | 1 | 是否是调试，可以给每个dialog对象一个随机背景色方便区分 |

#### type
| 参数        | 类型 | 默认值        | 描述 |
| ------------- |:-----|:--------:| -----:|
| type     | `String` | - | 触发事件类型 |

### 调用函数 ###

| 函数名        | 参数 | 描述 |
| ------------- |:--------:| -----:|
| show     | - | 显示dialog |
| close     | - | 关闭（隐藏）dialog |
| destroy     | - | 销毁dialog |
| unBindDialog     | - | 提供显式解除绑定触发初始化事件的方法
