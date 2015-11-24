module.exports = Response;

function Response(options){
  if (typeof options === "string") {
    this.msg = options
  } else {
    this.msg = options.msg;
  }
}