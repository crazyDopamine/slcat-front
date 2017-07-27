/**
 * Created by dongwei on 16/10/8.
 */
import {mix, each} from './utils';
import consts from './const';
// var formConfig = {
//   fieldSet: {},
//   submitValues: {},
//   errorClass: 'has-error',
//   rule: {},
//   validateResult: {},
//   fieldClass: {}
// };
//身份证号码验证
var isIdCardNo = function (num) {
  var len = num.length,
    re;
  if (len == 15) {
    re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
  } else if (len == 18) {
    re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
  } else {
    //alert("输入的数字位数不对。");
    return false;
  }
  var a = num.match(re);
  if (a != null) {
    if (len == 15) {
      var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
      var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
    }
    else {
      var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
      var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
    }
    if (!B) {
      //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
      return false;
    }
  }
  if (!re.test(num)) {
    //alert("身份证最后一位只能是数字和字母。");
    return false;
  }
  return true;
}
/**
 * 表单验证初始化
 * @param formNode
 */
var
  validateInit = function (formNode) {
    var fieldClass = {};
    var validateResult = {};
    if (!formNode) formNode = this;
    each(formNode.rule, function (rule, name) {
      if (rule.array) {
        fieldClass[name] = [];
        fieldClass[name + '_children'] = [];
        validateResult[name] = {children: []};
      } else {
        fieldClass[name] = [];
        validateResult[name] = {};
      }
    });
    formNode.fieldClass = fieldClass;
    formNode.validateResult = validateResult;
  }
/**
 * 数组class初始化
 * @param rule
 * @returns {{}}
 */
var arrayItemFieldClassInit = function (rule) {
  var fieldClass = {};
  each(rule, function (rule, name) {
    fieldClass[name] = [];
  });
  return fieldClass;
}
/**
 * 数组validateResult初始化
 * @param rule
 * @returns {{}}
 */
var arrayItemValidateResultInit = function (rule) {
  var validateResult = {};
  each(rule, function (rule, name) {
    validateResult[name] = {};
  });
  return validateResult;
}
/**
 * 给表单赋值
 * @param values
 * @param formNode
 */
var setValues = function (values, formNode) {
  if (!formNode) formNode = this;
  if (typeof values == 'object') {
    each(values, (val, key) => {
      if (val == null) val = '';
      if (formNode.fieldSet[key] != undefined || key === 'id') {
        // formNode.fieldSet[key] = val;
        this.$set(formNode.fieldSet,key,val)
      }
    });
  }
}
/**
 * 获取表单结果
 * @param formNode
 * @returns {{}}
 */
var getValues = function (formNode) {
  if (!formNode) formNode = this;
  var values = {};
  each(formNode.fieldSet, function (field, key) {
    values[key] = fieldValue(field, formNode);
  });
  return values;
}
/**
 * 获取单个结果
 * @param formNode
 * @returns {{}}
 */
var fieldValue = function (field) {
  var value = '';
  if (field != null && field instanceof Array) {
    value = [];
    each(field, function (item, index) {
      value.push(fieldValue(item));
    });
  } else if (field != null && field instanceof Object) {
    value = {};
    each(field, function (item, key) {
      value[key] = fieldValue(item);
    });
  } else if (field != null) {
    value = field;
  }
  return value;
}
/**
 * 重置表单
 * @param formNode
 */
var reset = function (formNode) {
  if (!formNode) formNode = this;
  each(formNode.fieldSet, function (value, key) {
    if (formNode.fieldSet[key] instanceof Array) {
      formNode.fieldSet[key] = [];
    } else if (typeof formNode.fieldSet[key] == 'object') {
      formNode.fieldSet[key] = {};
    } else {
      formNode.fieldSet[key] = '';
    }
  });
  this.validateInit(formNode);
}

/**
 * 验证
 * @param showMsg
 * @param formNode
 * @param options 可配置单独rule,value进行验证
 * @returns {*}
 */
var validate = function (showMsg, formNode, options) {
  var self = this;
  if (!formNode) formNode = this;
  options = mix({}, options, {showMsg: showMsg});
  if (options && options.name) {
    return this.validateField(name, formNode, options);
  }
  var rule = options.rule || formNode.rule;
  var result = true;
  if (options.value) {
    each(rule, function (rule, name) {
      var fieldOptions = mix({}, options, {
        rule: rule,
        value: fieldValue(options.value[name], formNode)
      });
      var isValidate = self.validateField(name, fieldOptions, formNode);
      if (result && !isValidate) {
        result = false;
      }
    });
  } else {
    each(rule, function (rule, name) {
      if (!result) {
        options.showMsg = false;
      }
      var isValidate = self.validateField(name, options, formNode);
      if (result && !isValidate) {
        result = false;
      }
    });
  }
  return result;
}
/**
 * 验证字段
 * @param name 字段名
 * @param showMsg 是否提示消息
 * @param formNode 域
 * @param value 值
 * @param rule 规则
 * @returns {boolean}
 */
var validateField = function (name, options, formNode) {
  if (name == undefined) {
    return true;
  }
  var validateResult, fieldClass, rule, value, fieldSet, field;
  var self = this;
  if (!formNode) formNode = this;
  rule = options.rule || formNode.rule[name];
  value = options.value || '';
  validateResult = options.validateResult || formNode.validateResult;
  fieldClass = options.fieldClass || formNode.fieldClass;
  if (options.value == undefined && rule.field) {
    field = rule.field;
    value = fieldValue(field, formNode);
  } else if (options.value == undefined) {
    if (rule.fieldSet) {
      fieldSet = formNode[rule.fieldSet];
    } else {
      fieldSet = formNode.fieldSet;
    }
    field = fieldSet[name];
    value = fieldValue(field, formNode);
  }
  if (!fieldClass[name]) {
    fieldClass[name] = [];
  }
  if (fieldClass[name].clear) {
    fieldClass[name].clear();
  } else {
    fieldClass[name] = []
  }
  validateResult[name] = {
    dirty: true,
    valid: true,
    children: []
  };
  var msg = rule.label;
  if (rule.msg) msg = rule.msg;
  if (rule.required) {
    var hasNull = false;
    if (value instanceof Array) {
      each(value, function (item, index) {
        if (item === undefined || item === null || item === '') {
          hasNull = true;
        }
      });
    }
    if (value === undefined || value === null || value === '' || (value instanceof Array && value.length <= 0) || (value instanceof Array && hasNull)) {
      if (!rule.msg) {
        msg += '不能为空';
      }
      validateResult[name] = mix({}, validateResult[name], {
        required: false,
        msg: '不能为空!'
      });
      if (!fieldClass[name].contains("error-required")) {
        fieldClass[name].push("error-required")
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        required: true
      });
    }
  }
  if (rule.number && value) {
    if (isNaN(Number(value))) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '数字格式错误';
      }
      validateResult[name] = mix({}, validateResult[name], {
        number: false,
        msg: '数字格式错误!'
      });
      if (!fieldClass[name].contains("error-number")) {
        fieldClass[name].push("error-number");
      }
    } else if (value > Math.pow(10, 14)) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '数字不能大于10的14次方';
      }
      validateResult[name] = mix({}, validateResult[name], {
        number: false,
        msg: '数字不能大于10的14次方!'
      });
      if (!fieldClass[name].contains("error-number")) {
        fieldClass[name].push("error-number");
      }
    } else if (value < -Math.pow(10, 14)) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '数字不能小于负10的14次方';
      }
      validateResult[name] = mix({}, validateResult[name], {
        number: false,
        msg: '数字不能小于负10的14次方!'
      });
      if (!fieldClass[name].contains("error-number")) {
        fieldClass[name].push("error-number");
      }
    } else if (value.toString().split('.').length == 2 && value.toString().split('.')[1].length > 6) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '小数点后不能大于6位';
      }
      validateResult[name] = mix({}, validateResult[name], {
        number: false,
        msg: '小数点后不能大于6位!'
      });
      if (!fieldClass[name].contains("error-number")) {
        fieldClass[name].push("error-number");
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        number: true
      });
    }
  }
  if (rule.numberString) {
    if (isNaN(Number(value))) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '包含了非数字字符';
      }
      validateResult[name] = mix({}, validateResult[name], {
        numberString: false,
        msg: '包含了非数字字符!'
      });
      if (!fieldClass[name].contains("error-number-string")) {
        fieldClass[name].push("error-number-string");
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        numberString: true
      });
    }
  }
  if (rule.digits) {
    if (isNaN(Number(value))) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '数字格式错误';
      }
      validateResult[name] = mix({}, validateResult[name], {
        digits: false,
        msg: '数字格式错误!'
      });
      if (!fieldClass[name].contains("error-digits")) {
        fieldClass[name].push("error-digits");
      }
    } else if (value % 1 !== 0) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '不为整数';
      }
      validateResult[name] = mix({}, validateResult[name], {
        digits: false,
        msg: '不为整数!'
      });
      if (!fieldClass[name].contains("error-digits")) {
        fieldClass[name].push("error-digits");
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        digits: true
      });
    }
  }
  if (rule.max != undefined) {
    if (isNaN(Number(value))) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '数字格式错误';
      }
      validateResult[name] = mix({}, validateResult[name], {
        max: false,
        msg: '数字格式错误!'
      });
      if (!fieldClass[name].contains("error-max")) {
        fieldClass[name].push("error-max");
      }
    } else if (Number(value) > rule.max) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '不得大于' + rule.max;
      }
      validateResult[name] = mix({}, validateResult[name], {
        max: false,
        msg: '不得大于' + rule.max + "!"
      });
      if (!fieldClass[name].contains("error-max")) {
        fieldClass[name].push("error-max");
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        max: true
      });
    }
  }
  if (rule.min != undefined) {
    if (isNaN(Number(value))) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '数字格式错误';
      }
      validateResult[name] = mix({}, validateResult[name], {
        min: false,
        msg: '数字格式错误!'
      });
      if (!fieldClass[name].contains("error-min")) {
        fieldClass[name].push("error-min");
      }
    } else if (typeof rule.min === 'object') {
      var tmpValue = rule.min.value || 0; //value为最小值,不传则默认设为0
      var tmpEqual = rule.min.equal != undefined ? rule.min.equal : true; //equal为是否可等于,默认是可以,如不需要等于,equal设为false即可

      if (tmpEqual && (Number(value) < tmpValue)) {
        if (!rule.msg) {
          if (msg != rule.label) msg += ',';
          msg += '不得小于' + tmpValue;
        }
        validateResult[name] = mix({}, validateResult[name], {
          min: false,
          msg: '不得小于' + tmpValue + "!"
        });
        if (!fieldClass[name].contains("error-min")) {
          fieldClass[name].push("error-min");
        }
      } else if (!tmpEqual && (Number(value) <= tmpValue)) {
        if (!rule.msg) {
          if (msg != rule.label) msg += ',';
          msg += '不得小于等于' + tmpValue;
        }
        validateResult[name] = mix({}, validateResult[name], {
          min: false,
          msg: '不得小于等于' + tmpValue + "!"
        });
        if (!fieldClass[name].contains("error-min")) {
          fieldClass[name].push("error-min");
        }
      }
    } else if (Number(value) < rule.min) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '不得小于' + rule.min;
      }
      validateResult[name] = mix({}, validateResult[name], {
        min: false,
        msg: '不得小于' + rule.min + "!"
      });
      if (!fieldClass[name].contains("error-min")) {
        fieldClass[name].push("error-min");
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        min: true
      });
    }
  }
  if (rule.maxLength) {
    if (value && value.toString && value.toString().length > rule.maxLength) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '长度不得大于' + rule.maxLength;
      }
      validateResult[name] = mix({}, validateResult[name], {
        min: false,
        msg: '长度不得大于' + rule.maxLength + "!"
      });
      if (!fieldClass[name].contains("error-max-length")) {
        fieldClass[name].push("error-max-length");
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        maxLength: true
      });
    }
  }
  if (rule.minLength) {
    if (value && value.toString && value.toString().length < rule.minLength) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '长度不得小于' + rule.minLength;
      }
      validateResult[name] = mix({}, validateResult[name], {
        min: false,
        msg: '长度不得大于' + rule.minLength + "!"
      });
      if (!fieldClass[name].contains("error-min-length")) {
        fieldClass[name].push("error-min-length");
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        minLength: true
      });
    }
  }
  if (rule.equalTo) {
    var equalField = fieldSet[rule.equalTo.name];
    var equalValue;
    if (equalField != null && equalField.id) {
      equalValue = avalon.vmodels[equalField.id].value
    } else if (equalField != null && equalField.$model !== undefined) {
      equalValue = equalField.$model;
    } else if (equalField != null) {
      equalValue = equalField;
    } else {
      console.log(rule.equalTo + '未找到');
      return false;
    }
    if (value != equalValue) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '与' + rule.equalTo.label + '不同';
      }
      validateResult[name] = mix({}, validateResult[name], {
        equalTo: false,
        msg: '与' + rule.equalTo.label + '不同!'
      });
      if (!fieldClass[name].contains("error-equal-to")) {
        fieldClass[name].push("error-equal-to");
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        equalTo: true
      });
    }
  }
  if (rule.phoneNumber) {
    if (!value.match(/^(1[34578]\d{9})$/)) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '手机号码格式错误';
      }
      validateResult[name] = mix({}, validateResult[name], {
        phoneNumber: false,
        msg: '手机号码格式错误!'
      });
      if (!fieldClass[name].contains("error-phone-number")) {
        fieldClass[name].push("error-phone-number");
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        phoneNumber: true
      });
    }
  }
  if (rule.idCardNo) {
    if (!isIdCardNo(value)) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '身份证格式错误';
      }
      validateResult[name] = mix({}, validateResult[name], {
        idCardNo: false,
        msg: '身份证格式错误!'
      });
      if (!fieldClass[name].contains("error-id-card-no")) {
        fieldClass[name].push("error-id-card-no");
      }
    } else {
      validateResult[name] = mix({}, validateResult[name], {
        idCardNo: true
      });
    }
  }
  if (rule.email) {
    var reg = /^[a-zA-Z0-9_\.\-]+@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})$/;
    if (!reg.test(value)) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '邮箱格式错误';
      }
      validateResult[name] = mix({}, validateResult[name], {
        email: false,
        msg: '邮箱格式错误!'
      });
      if (!fieldClass[name].contains("error-email-no")) {
        fieldClass[name].push("error-email-no");
      }
    }
  }
  if (rule.array && value instanceof Array) {
    if (!fieldClass[name + '_children']) fieldClass[name + '_children'] = [];
    var result = true;
    each(value, function (index, item) {
      if (!validateResult[name].children[index]) {
        validateResult[name].children.set(index, arrayItemValidateResultInit(rule.array));
      }
      if (!fieldClass[name + '_children'][index]) {
        fieldClass[name + '_children'].set(index, arrayItemFieldClassInit(rule.array));
      }
      if (result) {
        result = self.validate(options.showMsg, formNode, {
          value: item,
          rule: rule.array,
          arrayIndex: index,
          fieldClass: fieldClass[name + '_children'][index],
          validateResult: validateResult[name].children[index],
          child: true
        });
      } else {
        self.validate(false, formNode, {
          value: item,
          rule: rule.array,
          arrayIndex: index,
          fieldClass: fieldClass[name + '_children'][index],
          validateResult: validateResult[name].children[index],
          child: true
        });
      }
    });
    if (!result) {
      if (!rule.msg) {
        if (msg != rule.label) msg += ',';
        msg += '数据验证失败!';
      }
      validateResult[name] = mix({}, validateResult[name], {
        array: false,
        msg: '数据验证失败!'
      });
      if (!fieldClass[name].contains("error-array")) {
        fieldClass[name].push("error-array");
      }
    }
  }
  if (rule.fn) {
    rule.fn(value, field);
  }
  if (fieldClass[name].length > 0) {
    validateResult[name].valid = false;
    if (!fieldClass[name].contains(self.errorClass)) fieldClass[name].push(self.errorClass);
    if (validateResult[name].array !== false && options && options.showMsg) {
      if (window.vm.$vux) {
        window.vm.$vux.toast.text(msg + '!', 'bottom')
      } else if (window.vm.$Message) {
        window.vm.$Message.error(msg + '!')
      }

    }
    return false;
  }
  return true;
}

export default {
  data: function () {
    return {
      fieldSet: {},
      submitValues: {},
      errorClass: 'has-error',
      rule: {},
      validateResult: {},
      fieldClass: {}
    }
  },
  methods: {
    validateInit: validateInit,
    validate: validate,
    validateField: validateField,
    getValues: getValues,
    setValues: setValues,
    reset: reset
  },
  created: function () {
    this.validateInit()
  }
}
