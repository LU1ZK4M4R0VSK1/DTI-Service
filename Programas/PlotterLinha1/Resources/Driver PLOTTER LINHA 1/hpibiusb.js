/// <reference path="v4PrintDriver-Intellisense.js" />
// Version 3.12
//
// Note: See http://san-xwiki-1.cscr.hp.com:8080/xwiki/bin/view/CSL_Components/v4BiDiUSBExtension 
// for documentation on the query strings and functions used to build queries.

getSchemas = function (scriptContext, printerStream, schemaRequests, printerBidiSchemaResponses) {
    debugger;
    var pageCache = new PageCache(scriptContext, printerStream);
    var requestProcessor = new RequestProcessor(printerBidiSchemaResponses, pageCache, scriptContext);

    var i = 0;
    for (i = 0; i < schemaRequests.length; i++) {
        var args = schemaRequests[i].split(';');

        if (args.length >= 3) {
            var queryStr = args[0];
            var procFunc = args[1];
            var ledmResource = args[2];
            var params = [];
            if (args.length >= 4) {
                params = args.slice(3);
            }
            if (requestProcessor.ValidGetFunctions.indexOf(procFunc) != -1) {
                requestProcessor[procFunc](queryStr, ledmResource, params);
            }
        }
    }
    return 0;
};

setSchema = function (scriptContext, printerStream, printerBidiSchemaElement) {
    debugger;
    var pageCache = new PageCache(scriptContext, printerStream);
    var value = printerBidiSchemaElement.value;
    try {
        if (printerBidiSchemaElement.type === "BIDI_STRING") {
            value = value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        }
        var response = pageCache.RawRequest(value);
        printerBidiSchemaElement.value = response;
    } catch (err) {
        pageCache.log = "setSchema exception caught: " + err;
    }
    return 0;
};

getStatus = function (scriptContext, printerStream, printerBidiSchemaResponses) {
    return 2;
};

requestStatus = function (scriptContext, printerStream, printerBidiSchemaResponses) {
    var retVal = 2;
    var pageCache = new PageCache(scriptContext, printerStream);
    var requestProcessor = new RequestProcessor(printerBidiSchemaResponses, pageCache, scriptContext);
    pageCache.statusRead = true;
    var statusContent = pageCache.GetContent("/DevMgmt/ProductStatusDyn.xml", false);
    if ((null != statusContent) && (statusContent != "")) {
        var statusValue = requestProcessor.InnerXml("psdyn:Status", statusContent);
        var statusMsg = requestProcessor.InnerXml("pscat:StatusCategory", statusValue);
        var statusAlertTable = requestProcessor.InnerXml("psdyn:AlertTable", statusContent)
        if (statusMsg.toUpperCase() == "DoorOpen".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'DoorOpen');
        else if (statusMsg.toUpperCase() == "closeDoorOrCover".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'closeDoorOrCover');
        else if (statusMsg.toUpperCase() == "MediaEmpty".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'MediaEmpty');
        else if ((statusMsg.toUpperCase() == "toner-empty-error".toUpperCase()))
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'toner-empty-error');
        else if (statusMsg.toUpperCase() == "MediaJam".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'MediaJam');
        else if (statusMsg.toUpperCase() == "jamInPrinter".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'jamInPrinter');
        else if (statusMsg.toUpperCase() == "output-area-full".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'output-area-full');
        else if (statusMsg.toUpperCase() == "toner-empty-warning".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'toner-empty-warning');
        else if (statusMsg.toUpperCase() == "toner-low-report".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'toner-low-report');
        else if (statusMsg.toUpperCase() == "trayEmptyOrOpen".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'trayEmptyOrOpen');
		else if (statusMsg.toUpperCase() == "trayEmpty".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'trayEmpty');
        else if (statusMsg.toUpperCase() == "cartridgeMissing".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'cartridgeMissing');
        else if (statusMsg.toUpperCase() == "paused".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'paused');
        else if (statusMsg.toUpperCase() == "cartridgeLow".toUpperCase() || MatchStatusAlertID(statusAlertTable, "cartridgeLow"))
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'cartridgeLow');
        else if (statusMsg.toUpperCase() == "replaceCartridgeOut".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'replaceCartridgeOut');
        else if (statusMsg.toUpperCase() == "cartridgeVeryLow".toUpperCase() || MatchStatusAlertID(statusAlertTable, "cartridgeVeryLow"))
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'cartridgeVeryLow');
        else if (statusMsg.toUpperCase() == "cartridgeCounterfeitQuestion".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'cartridgeCounterfeitQuestion');
        else if (statusMsg.toUpperCase() == "cartridgeFailure".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'cartridgeFailure');
        else if (statusMsg.toUpperCase() == "incompatibleConsumable".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'incompatibleConsumable');
        else if (statusMsg.toUpperCase() == "insertSETUPCartridge".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'insertSETUPCartridge');
        else if (statusMsg.toUpperCase() == "upgradableSupply".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'upgradableSupply');
        else if (statusMsg.toUpperCase() == "nonHPSupplyDetected".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'nonHPSupplyDetected');
        else if (statusMsg.toUpperCase() == "genuineHP".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'genuineHP');
        else if (statusMsg.toUpperCase() == "startupRoutineFailed".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'startupRoutineFailed');
        else if (statusMsg.toUpperCase() == "inReserveMode".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'inReserveMode');
        else if (statusMsg.toUpperCase() == "printFailure".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'printFailure');
        else if (statusMsg.toUpperCase() == "printerError".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'printerError');
		else if (statusMsg.toUpperCase() == "scannerError".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'scannerError');
        else if (statusMsg.toUpperCase() == "sizeMismatchInTray".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'sizeMismatchInTray');
        else if (statusMsg.toUpperCase() == "outputBinOpened".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'outputBinOpened');
        else if (statusMsg.toUpperCase() == "tooManyPagesToStaple".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'tooManyPagesToStaple');
		else if (statusMsg.toUpperCase() == "carriageJam".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'carriageJam');
		else if (statusMsg.toUpperCase() == "cartridgeSubsystemMaintenanceNeeded".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'cartridgeSubsystemMaintenanceNeeded');
		else if (statusMsg.toUpperCase() == "shaidElectricalFailure".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'shaidElectricalFailure');
        else
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'None');
        retVal = 0;
    }
    return retVal;

};

RequestProcessor = function (printerBidiSchemaResponses, pageCache, scriptContext) {
    this.responses = printerBidiSchemaResponses;
    this.pageCache = pageCache;
    this.Context = scriptContext;
    this.content = "";
    this.ValidGetFunctions = "FindIndexXmlStr,TagContainsBool,TagAnyContainsBool,FindIndexXmlConvertStr,AllContentStr," +
		"FindIndexXmlInt, InnerXmlInt,InnerXmlStr,InnerXmlMapStr,GetQueuePropStr,QueueRequestStr,StrCmpBool,MultiTagContainsBool";
    this.ValidSetFunctions = "SetRequest";
};

RequestProcessor.prototype.FindIndexXmlInt = function (bidiQueryStr, contentName, queryArray) {
    var content = this.pageCache.GetContent(contentName, true);
    this.content = "";
    if (content) {
        var index = queryArray.pop();
        var child = queryArray.pop();
        if (queryArray.length > 0) {
            var result = this.FindIndexedXmlValue(content, queryArray, child, index);
            if ((null != result) && (null != this.responses)) {
                this.responses.AddInt32(bidiQueryStr, result);
            }
        }
        return true;
    }
    return false;
};

RequestProcessor.prototype.FindIndexXmlStr = function (bidiQueryStr, contentName, queryArray) {
    var content = this.pageCache.GetContent(contentName, true);
    this.content = "";

    if (content) {
        var index = queryArray.pop();
        var child = queryArray.pop();
        if (queryArray.length > 0) {
            var result = this.FindIndexedXmlValue(content, queryArray, child, index);
            if ((null != result) && (null != this.responses)) {
                this.responses.AddString(bidiQueryStr, result);
            }
        }
        return true;
    }
    return false;
};

// FindIndexXmlConvertStr() and FindConversionValue() functions added for converting between string data types 
// For example converting Mediatype value from 'stationerylightweight'->'light'

RequestProcessor.prototype.FindIndexXmlConvertStr = function (bidiQueryStr, contentName, queryArray) {
    var content = this.pageCache.GetContent(contentName, true);
    this.content = "";
    if (content) {
        if (queryArray.length > 2) {
            var tempArray = queryArray.slice(0, 1);
            var result = this.FindIndexedXmlValue(content, tempArray, queryArray[1], queryArray[2]);
            if ((null != result) && (null != this.responses)) {
                if ((bidiQueryStr.indexOf("Width") !== -1) || (bidiQueryStr.indexOf("Length") !== -1)) {
					result = Math.round(parseFloat((result * 720 * 1000) / 25400));
					result = String(result);
				}
				
				result = this.FindConversionValue(result, queryArray);
                this.responses.AddString(bidiQueryStr, result);
            }
        }
        return true;
    }
    return false;
};


RequestProcessor.prototype.FindConversionValue = function (result, queryArray, minSize) {
    var MIN_SIZE = 5;
    if (null != result) {
        if (typeof minSize == 'undefined')
            minSize = MIN_SIZE;
        var i = minSize;
        while (i <= queryArray.length) {
            if (result == queryArray[i - 2]) {
                return queryArray[i - 1];
            }

            i = i + 2;
        }
    }
    return result;
};

RequestProcessor.prototype.TagContainsBool = function (bidiQueryStr, contentName, queryArray) {
    if ((null != queryArray) && (queryArray.length >= 2)) {
        this.content = "";
        var content = this.pageCache.GetContent(contentName, true);
        if (content) {
            var result = false;
            var queryPattern = new RegExp(queryArray.pop(), "gm");
            var value = this.InnerXmlMultiple(queryArray, content);

            if (null != value) {
                result = queryPattern.test(value);
            }

            if (null != this.responses) {
                this.responses.AddBool(bidiQueryStr, result);
            }
            return true;
        }
        return false;
    }
    return false;
};


// StrCmpBool() function added for absolute string compare

RequestProcessor.prototype.StrCmpBool = function (bidiQueryStr, contentName, queryArray) {
    if ((null != queryArray) && (queryArray.length >= 2)) {
        this.content = "";
        var content = this.pageCache.GetContent(contentName, true);
        if (content) {
            var result = false;
            var value = this.InnerXml(queryArray[0], content);
            if (null != value) {
                if (value == queryArray[1])
                    result = true;
            }

            if (null != this.responses) {
                this.responses.AddBool(bidiQueryStr, result);
            }
            return true;
        }
        return false;
    }
    return false;
};


// MultiTagContainsBool() function added for checking values of multiple nodes

//example usage:

//bidiQueryStr - \Printer.Configuration.DuplexUnit:Installed
//contentName - /DevMgmt/ProductConfigDyn.xml
//queryArray - dd:DuplexUnit,dd:DuplexBindingOption;Installed;longEdge;shortEdge
//dd: DuplexUnit nodevalue returned from device is checked for Installed||longEdge||shortEdge
//dd: DuplexBindingOption nodevalue returned from device is checked for Installed||longEdge||shortEdge



RequestProcessor.prototype.MultiTagContainsBool = function (bidiQueryStr, contentName, queryArray) {
    var content = "";
    var result = false;
    content = this.pageCache.GetContent(contentName, true);
    if (content) {
        var option = "";
        var args = queryArray[0].split(',');
        for (i = 0; i < args.length; i++) {
            if (-1 != content.indexOf(args[i])) {
                option = this.InnerXml(args[i], content);
                if (option != null) {
                    result = this.MultiStrCompBool(queryArray, option);
                    if (result == true)
                        break;
                }
            }
        }
        this.responses.AddBool(bidiQueryStr, result);
        return true;
    }
    return false;
};


RequestProcessor.prototype.MultiStrCompBool = function (queryArray, option) {

    for (j = queryArray.length; j > 1; j--) {
        if (option == queryArray.pop()) {
            return true;
        }
    }
    return false;
};




RequestProcessor.prototype.TagAnyContainsBool = function (bidiQueryStr, contentName, queryArray) {
    if ((null != queryArray) && (queryArray.length >= 2)) {
        var content = this.pageCache.GetContent(contentName, true);
        this.content = "";

        if (content) {
            var queryPattern = new RegExp(queryArray.pop(), "gm");
            var result = false;

            do {
                var value = this.InnerXmlMultiple(queryArray, content);
                if ((null != value) && queryPattern.test(value)) {
                    result = true;
                }
                content = this.content;
            } while (null != value);

            if (null != this.responses) {
                this.responses.AddBool(bidiQueryStr, result);
            }
            return true;
        }
        return false;
    }
    return false;
};


RequestProcessor.prototype.InnerXmlInt = function (bidiQueryStr, contentName, queryArray) {
    if (null != queryArray) {
        this.content = "";
        var content = this.InnerXmlMultiple(queryArray, this.pageCache.GetContent(contentName, true));

        if ((null != content) && (null != this.responses)) {
            this.responses.AddInt32(bidiQueryStr, content);
        }

        if (content) {
            return true;
        }
    }
    return false;
};


RequestProcessor.prototype.InnerXmlStr = function (bidiQueryStr, contentName, queryArray) {
    if (null != queryArray) {
        this.content = "";
        var content = this.InnerXmlMultiple(queryArray, this.pageCache.GetContent(contentName, true));

        if ((null != content) && (null != this.responses)) {
            this.responses.AddString(bidiQueryStr, content);
        }

        if (content) {
            return true;
        }
    }
    return false;
};


RequestProcessor.prototype.AllContentStr = function (bidiQueryStr, contentName, queryArray) {
    var cacheContent = false;

    if (null != queryArray) {
        var truePattern = /true/;
        cacheContent = truePattern.test(queryArray[0]);
    }

    var content = this.pageCache.GetContent(contentName, cacheContent);

    if ((null != content) && (null != this.responses)) {
        var xmlTagRe = /<\?.*\?>\r\n/gm;
        if (xmlTagRe.test(content)) {
            content = content.substring(xmlTagRe.lastIndex);
        }
        this.responses.AddString(bidiQueryStr, content);
        return true;
    }
    return false;
};


RequestProcessor.prototype.InnerXmlMapStr = function (bidiQueryStr, contentName, queryArray) {
    var mapIndex = 0;
    var mapRe = /=/g;
    for (mapIndex = 0; mapIndex < queryArray.length; mapIndex++) {
        if (mapRe.test(queryArray[mapIndex])) {
            break;
        }
    }
    var tagArray = queryArray.slice(0, mapIndex);
    var mapArray = queryArray.slice(mapIndex);
    var defaultValue = "Idle";

    this.content = "";
    var content = this.InnerXmlMultiple(tagArray, this.pageCache.GetContent(contentName, true));
    if (null != content) {
        var re = new RegExp(content, "gm");
        for (var i = 0; i < mapArray.length; i++) {
            var idx = mapArray[i].indexOf("=");
            var name = mapArray[i].substr(0, idx);
            var value = mapArray[i].substring(idx + 1);
            if ((idx >= 0) && re.test(name)) {
                this.responses.AddString(bidiQueryStr, value);
                return;
            }

            if (name.indexOf("default") === 0) {
                defaultValue = value;
            }
        }

        if (null != this.responses) {
            this.responses.AddString(bidiQueryStr, defaultValue);
        }
        return true;
    }
    return false;
};


RequestProcessor.prototype.FindIndexedXmlValue = function (xml, parent, child, index) {
    if (null != xml) {
        this.content = xml;
        var indexRe = new RegExp(index, "gm");

        do {
            var innerXml = this.InnerXmlMultiple(parent, this.content);
            if ((null != innerXml) && indexRe.test(innerXml)) {
                innerXml = this.InnerXml(child, innerXml);
                return innerXml;
            }
        } while (null != innerXml);
    }
    return null;
};


RequestProcessor.prototype.InnerXml = function (tag, xml) {
    if ((null != xml) && (null != tag)) {
        // If there is an attribute in the opening tag then we failed until I split the openRe in half and 
        // detected the close below (openIdx)
        var openRe = new RegExp("<" + tag, "gm");
        var closeRe = new RegExp("</" + tag + ">", "gm");

        if (openRe.test(xml) && closeRe.test(xml)) {
            var openIdx = xml.indexOf(">", openRe.lastIndex) + 1;
            var inner = xml.substring(openIdx, closeRe.lastIndex - tag.length - 3);
            this.content = xml.substring(closeRe.lastIndex);
            return inner;
        }
    }
    return null;
};


RequestProcessor.prototype.InnerXmlMultiple = function (tagArray, xml) {
    if ((null != xml) && (null != tagArray) && (tagArray.length > 0)) {
        var index = 0;
        // Save the context for the parent so that this.content is correct when we leave
        var parentContext = null;
        var content = xml;
        for (index = 0; index < tagArray.length; index++) {
            if (null != content) {
                content = this.InnerXml(tagArray[index], content);
                if ((null != content) && (null == parentContext)) {
                    parentContext = this.content;
                }
            }
            else {
                break;
            }
        }

        if (null != parentContext) {
            this.content = parentContext;
        }
        return content;
    }
    return null;
};


PageCache = function (scriptContext, printerStream) {
    this.Context = scriptContext;
    this.printerStream = printerStream;
    this.ContentArray = [];
    this.readContent = "";
    this.ToMatch = "";
    // lastHeader is used in error reporting when we fail a request.
    this.lastHeader = null;
    this.readAttempts = 0;
    this.statusRead = false;
};


PageCache.prototype.GetContent = function (contentName, saveInCache) {
    var content = null;
    if (saveInCache) {
        content = this.ContentArray[contentName];
    }

    if ((content === undefined) || (content === null)) {
        content = this.FetchLedmContent(contentName);
        if ((content != undefined) && (content != null) && saveInCache) {
            this.SetContent(contentName, content);
        }
    }
    return content;
};


PageCache.prototype.SetContent = function (contentName, content) {
    if (null != contentName) {
        this.ContentArray[contentName] = content;
    }
};


// Break out RawRequest (it is common for all gets and sets) and simplify FetchLedmContent and SetLedmContent
PageCache.prototype.FetchLedmContent = function (path) {
    if (null != path) {
        if (this.VerifyChannel())
		{
            var requestStr = "GET ".concat(path, " HTTP/1.1\r\nHOST:localhost\r\n\r\n");
            return this.RawRequest(requestStr);
        }
    }
    return null;
};


PageCache.prototype.VerifyChannel = function () {
    if (this.ChannelVerified === undefined) {
        //var pjlcommand = [0x40, 0x50, 0x4A, 0x4C, 0x20, 0x43, 0x4F, 0x4D, 0x4D, 0x45, 0x4E, 0x54, 0x20, 0x22, 0x22, 0x0D, 0x0A, 0x0D, 0x0A];
        var pjlcommand = [0x1B, 0x25, 0x2D, 0x31, 0x32, 0x33, 0x34, 0x35, 0x58, 0x40, 0x50, 0x4A, 0x4C, 0x20, 0x43, 0x4F, 0x4D, 0x4D, 0x45, 0x4E, 0x54, 0x20, 0x22, 0x22, 0x0D, 0x0A, 0x1B, 0x25, 0x2D, 0x31, 0x32, 0x33, 0x34, 0x35, 0x58];
        var writtenStrLen = this.printerStream.Write(pjlcommand);

        if (this.IsWebServerConnected(500)) {
            this.ChannelVerified = true;

        } else {
            this.ChannelVerified = false;
        }
    }
    return this.ChannelVerified;
};


PageCache.prototype.SetLedmContent = function (method, path, content) {
    if (null != path) {
        if (null == method) method = "GET";

        var requestStr = method.concat(" ", path, " HTTP/1.1\r\n");
        if (null == content) {
            requestStr = requestStr.concat("\r\n");
        } else {
            var contentLength = content.length;
            requestStr = requestStr.concat("Content-Length: ", contentLength, "\r\n\r\n", content);
        }
        return this.RawRequest(requestStr);
    }
    return null;
};

PageCache.prototype.RawRequest = function (requestStr) {
    var requestBytes = this.BytesFromString(requestStr);
    var writtenStrLen = this.printerStream.Write(requestBytes);
    if (writtenStrLen > 0) {
        var response = this.GetHttpResponse();
        return response;
    }

    return null;
};

PageCache.prototype.GetHttpResponse = function () {
    var httpHeader = new HttpHeader(this);
    if (httpHeader.ReadHeaderNow()) {
        var ledmResponse = "";
        if (httpHeader.ContentLength > 0) {
            ledmResponse = this.ReadResponse(httpHeader.ContentLength);
        }
        else if (httpHeader.IsChunked) {
            ledmResponse = this.ReadChunkedResponse();
        }
        return ledmResponse;
    }
    return null;
};

PageCache.prototype.StringFromBytes = function (bytes) {
    if ((bytes === undefined) || (bytes === null)) {
        return null;
    }
    var length = bytes.length;
    var result = "";
    for (var i = 0; i < length; i++) {
        if (bytes[i] != undefined) {
            result += String.fromCharCode(bytes[i]);
        }
    }
    return result;
};


PageCache.prototype.BytesFromString = function (content) {
    if (content === null) {
        return null;
    }

    var bytes = new Array(content.length);

    for (var i = 0; i < content.length; i++) {
        bytes[i] = content.charCodeAt(i);
    }
    return bytes;
};
PageCache.prototype.ReadBlock = function (requestLength) {
    var totalLength = 0;
    var zeroCount = 60;
    var reqLen = 512;
    do {
        try {
            // Delay the Read after handling huge data packets, this will make further responses from the device better
            // Try to avoid the Read crashes as much as possible
            if (this.readAttempts > 50) {
                if (this.statusRead == false) {
                    sleep(1000);
                    this.readAttempts = 0;
                }
            }
            var tempBytes = this.printerStream.Read(reqLen);
        }
        catch (err) {
            return -1;
        }
        this.readAttempts++;
        if (tempBytes.length > 0) {
            var actLen = tempBytes.length;
            this.readContent = this.readContent += this.StringFromBytes(tempBytes);
            totalLength += actLen;
            requestLength -= actLen;
            zeroCount = 60;

            var StrContent = String(this.readContent);
            if ((StrContent != "") && (StrContent.indexOf(this.ToMatch) >= 0)) {
                this.ToMatch = "";
                break;
            }
        }
        else {
            sleep(3);
            zeroCount--;
        }
    } while ((requestLength > 0) && (zeroCount > 0));

    return totalLength;
};
PageCache.prototype.ReadResponse = function (len) {
    var loopLimit = 100;
    if (len != NaN) {
        do {
            var remLen = len - this.readContent.length;
            var actLen = this.ReadBlock(remLen);
            if ((actLen > 0) && (len == this.readContent.length)) {
                var temp = this.readContent;
                this.readContent = "";
                return temp;
            }
        } while (loopLimit-- > 0);
    }
    return null;
};


PageCache.prototype.ReadChunkedResponse = function () {
    var results = "";
    var temp = "";
    do {
        temp = this.ReadChunk();
        if (temp === "")
            break;
        if (null != temp) {
            results = results.concat(temp);
        }
        else {
            this.ReadBlock(2);
        }
    } while (temp != null);
    return results;
};


PageCache.prototype.ReadChunkHeader = function () {
    var i = this.readContent.indexOf("\r\n");
    if (i > 0) {
        var len = parseInt(this.readContent, 16);
        this.readContent = this.readContent.substr(i + 2);
        return len;
    }
    return -1;
};


PageCache.prototype.ReadChunk = function () {
    var chunkLength = this.ReadChunkHeader();
    if (chunkLength < 0) {
        this.ReadBlock(8);
        chunkLength = this.ReadChunkHeader();
    }

    var chunkCountdown = 100;
    if (chunkLength != 0) {
        do {
            var remLen = chunkLength - this.readContent.length + 2;//The 2 bytes is for the last \r\n to be read but not part of the chunk

            if (remLen > 0) {
                i = this.ReadBlock(remLen);
            }

            if (chunkLength <= this.readContent.length) {
                var temp = this.readContent.substr(0, chunkLength);
                this.readContent = this.readContent.substring(chunkLength + 2);
                return temp;
            }
        } while (chunkCountdown-- > 0);
    }
    else
        return "";//this is done to handle 30 0D 0A 0D 0A
    return null;
};


PageCache.prototype.IsWebServerConnected = function (timeout) {

    var date = new Date();
    var curDate = null;
    var receivedData = false;
    var badRequest = new RegExp("Bad Request", "gmi");

    do {
        curDate = new Date();
        var tempBytes = this.printerStream.Read(512);
        if ((tempBytes != undefined) && (tempBytes.length > 0) && (badRequest.test(this.StringFromBytes(tempBytes)))) {
            receivedData = true;
        }
    } while ((receivedData == false) && (curDate - date < timeout));

    this.FlushChannel(100);
    return receivedData;
};


PageCache.prototype.FlushChannel = function (timeout) {
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
        var tempBytes = this.printerStream.Read(512);
    } while (((tempBytes != null) && (tempBytes.length > 0)) && (curDate - date < timeout));
    this.readContent = "";
};

HttpHeader = function (pageCache) {
    this.StatusCode = 0;
    this.IsChunked = false;
    this.ContentLength = 0;
    this.Content = "";
    this.pageCache = pageCache;
};

HttpHeader.prototype.ReadHeaderNow = function () {
    try {
        if (this.ReadHeader() == true) {
            this.pageCache.lastHeader = this;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
    return true;
};


HttpHeader.prototype.ReadHeader = function () {
    var index = this.ReadUntil("HTTP/1.1");
    if (index > 0) {
        this.pageCache.readContent = this.pageCache.readContent.substring(index);
    }

    if (index >= 0) {
        index = this.ReadUntil("\r\n\r\n");
        if (index >= 0) {
            this.Content = this.pageCache.readContent.substring(0, index + 4);
            this.pageCache.readContent = this.pageCache.readContent.substring(index + 4);

            this.StatusCode = parseInt(this.Content.substring(8));

            if (this.StatusCode === 200) {
                var ContentLengthPattern = /^Content-Length:/gmi;
                var ChunkedPattern = /^Transfer-Encoding/gmi;

                if (ContentLengthPattern.test(this.Content)) {
                    this.ContentLength = parseInt(this.Content.substring(ContentLengthPattern.lastIndex));
                }
                else if (ChunkedPattern.test(this.Content)) {
                    this.IsChunked = true;
                }
            }
            else {
                this.ContentLength = -1;
                this.IsChunked = false;
            }
        }
    }
    else {
        return false;
    }

    return true;
};


HttpHeader.prototype.ReadUntil = function (match) {
    var index = this.pageCache.readContent.indexOf(match);
    if (index >= 0) {
        return index;
    }
    this.pageCache.ToMatch = match;
    do {
        if (this.pageCache.ReadBlock(512) <= 0) return -1;
        index = this.pageCache.readContent.indexOf(match);
    } while (index < 0);

    return index;
};

//Matching StatusAlertID if StatusCategory is not getting updated for some of the devices error/warning status
MatchStatusAlertID = function (AlertTableXml, svalue) {
    if (AlertTableXml != null && AlertTableXml != '') {
        do {
            AlertxmlContent = RequestProcessor.prototype.InnerXml("psdyn:Alert", AlertTableXml);
            if (AlertxmlContent != null && AlertxmlContent != "") {
                var alertid = RequestProcessor.prototype.InnerXml("ad:ProductStatusAlertID", AlertxmlContent);
                if (alertid != null && alertid != "" && alertid.toUpperCase() == svalue.toUpperCase()) {
                    return true;
                }
                else {
                    AlertTableXml = AlertTableXml.replace("<psdyn:Alert>" + AlertxmlContent + "</psdyn:Alert>", '');
                }
            }
        } while (AlertxmlContent)
    }
    return false;
};

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

