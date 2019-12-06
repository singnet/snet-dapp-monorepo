/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

/*eslint-disable*/

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('snet_opennmt_romance_translator.Input', null, global);
goog.exportSymbol('snet_opennmt_romance_translator.Output', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
snet_opennmt_romance_translator.Input = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(snet_opennmt_romance_translator.Input, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  snet_opennmt_romance_translator.Input.displayName = 'snet_opennmt_romance_translator.Input';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
snet_opennmt_romance_translator.Input.prototype.toObject = function(opt_includeInstance) {
  return snet_opennmt_romance_translator.Input.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!snet_opennmt_romance_translator.Input} msg The msg instance to transform.
 * @return {!Object}
 */
snet_opennmt_romance_translator.Input.toObject = function(includeInstance, msg) {
  var f, obj = {
    sourceLang: msg.getSourceLang(),
    targetLang: msg.getTargetLang(),
    sentencesUrl: msg.getSentencesUrl()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!snet_opennmt_romance_translator.Input}
 */
snet_opennmt_romance_translator.Input.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new snet_opennmt_romance_translator.Input;
  return snet_opennmt_romance_translator.Input.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!snet_opennmt_romance_translator.Input} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!snet_opennmt_romance_translator.Input}
 */
snet_opennmt_romance_translator.Input.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSourceLang(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetLang(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSentencesUrl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!snet_opennmt_romance_translator.Input} message
 * @param {!jspb.BinaryWriter} writer
 */
snet_opennmt_romance_translator.Input.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
snet_opennmt_romance_translator.Input.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
snet_opennmt_romance_translator.Input.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getSourceLang();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getTargetLang();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getSentencesUrl();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!snet_opennmt_romance_translator.Input} The clone.
 */
snet_opennmt_romance_translator.Input.prototype.cloneMessage = function() {
  return /** @type {!snet_opennmt_romance_translator.Input} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string source_lang = 1;
 * @return {string}
 */
snet_opennmt_romance_translator.Input.prototype.getSourceLang = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
snet_opennmt_romance_translator.Input.prototype.setSourceLang = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string target_lang = 2;
 * @return {string}
 */
snet_opennmt_romance_translator.Input.prototype.getTargetLang = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
snet_opennmt_romance_translator.Input.prototype.setTargetLang = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string sentences_url = 3;
 * @return {string}
 */
snet_opennmt_romance_translator.Input.prototype.getSentencesUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
snet_opennmt_romance_translator.Input.prototype.setSentencesUrl = function(value) {
  jspb.Message.setField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
snet_opennmt_romance_translator.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(snet_opennmt_romance_translator.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  snet_opennmt_romance_translator.Output.displayName = 'snet_opennmt_romance_translator.Output';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
snet_opennmt_romance_translator.Output.prototype.toObject = function(opt_includeInstance) {
  return snet_opennmt_romance_translator.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!snet_opennmt_romance_translator.Output} msg The msg instance to transform.
 * @return {!Object}
 */
snet_opennmt_romance_translator.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    translation: msg.getTranslation()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!snet_opennmt_romance_translator.Output}
 */
snet_opennmt_romance_translator.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new snet_opennmt_romance_translator.Output;
  return snet_opennmt_romance_translator.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!snet_opennmt_romance_translator.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!snet_opennmt_romance_translator.Output}
 */
snet_opennmt_romance_translator.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTranslation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!snet_opennmt_romance_translator.Output} message
 * @param {!jspb.BinaryWriter} writer
 */
snet_opennmt_romance_translator.Output.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
snet_opennmt_romance_translator.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
snet_opennmt_romance_translator.Output.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getTranslation();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!snet_opennmt_romance_translator.Output} The clone.
 */
snet_opennmt_romance_translator.Output.prototype.cloneMessage = function() {
  return /** @type {!snet_opennmt_romance_translator.Output} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string translation = 1;
 * @return {string}
 */
snet_opennmt_romance_translator.Output.prototype.getTranslation = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
snet_opennmt_romance_translator.Output.prototype.setTranslation = function(value) {
  jspb.Message.setField(this, 1, value);
};


goog.object.extend(exports, snet_opennmt_romance_translator);
