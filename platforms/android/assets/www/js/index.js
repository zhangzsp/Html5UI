function RequestByPost(value1, value2) {
				var data;
				data = '<?xml version="1.0" encoding="GB2312"?>';
				data = data + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
				data = data + '<soap:Body>';
				data = data + '<getUserExist xmlns="http://tempuri.org/">';
				data = data + '<userEmail>' + $('#username').val() + '</userEmail>';
				data = data + '<userPassword>' + $('#password').val() + '</userPassword>';
				data = data + '</getUserExist>';
				data = data + '</soap:Body>';
				data = data + '</soap:Envelope>';
				var xmlhttp = GetXmlHttp();

				var URL = "http://192.168.3.160:8881/services/NodeGWWebService?wsdl";

				xmlhttp.open("POST", URL, false);
				xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=gb2312");
				xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/getUserExist");
				xmlhttp.send(data);
				// document.write( xmlhttp.responseText);
				if (xmlhttp.readyState == 4) {
					var xml = parseXml(xmlhttp.responseText);
					var result = xml.getElementsByTagName("getUserExistReturn")[0].firstChild.nodeValue;
					if (result == 0) {
                       // noti.startService();
						$('#hr').click();
					} else {
                        //alert(noti.showError());
						$('#error').click();
					}
				}
			}

			function GetXmlHttp() {

				if (window.XMLHttpRequest) {
					http_request = new XMLHttpRequest();
					if (http_request.overrideMimeType) {
						http_request.overrideMimeType("text/xml");
					}
				} else if (window.ActiveXObject) {
					try {
						http_request = new ActiveXObject("Mscml2.XMLHTTP");
					} catch(e) {
						try {
							http_request = new ActiveXObject("Microsoft.XMLHTTP");
						} catch(ex) {
						}
					}
				}
				if (!http_request) {
					window.alert("Your broswer not support XMLHttpRequest!");
				}
				return http_request;
			}

			function parseXml(xmlString) {
				var xmlDoc = null;
				//判断浏览器的类型
				//支持IE浏览器
				if (!window.DOMParser && window.ActiveXObject) {//window.DOMParser 判断是否是非ie浏览器
					var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
					for (var i = 0; i < xmlDomVersions.length; i++) {
						try {
							xmlDoc = new ActiveXObject(xmlDomVersions[i]);
							xmlDoc.async = false;
							xmlDoc.loadXML(xmlString);
							//loadXML方法载入xml字符串
							break;
						} catch(e) {
						}
					}
				}
				//支持Mozilla浏览器
				else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
					try {
						/* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
						 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
						 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
						 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
						 */
						domParser = new DOMParser();
						xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
					} catch(e) {
					}
				} else {
					return null;
				}

				return xmlDoc;
			}
			
			function gg(){
					  $("#ll").html("11111");
			}