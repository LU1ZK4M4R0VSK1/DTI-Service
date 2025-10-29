var psfPrefix = "psf";
var bpePrefix = "bpe";
var pskNs = "http://schemas.microsoft.com/windows/2003/08/printing/printschemakeywords";
var psfNs = "http://schemas.microsoft.com/windows/2003/08/printing/printschemaframework";
var bpeNs = "http://www.adobe.com/bpeschema";
var privateNs = "http://schemas.hp.com/lfp/ptpc/2006/1";
var xsiNs = "http://www.w3.org/2001/XMLSchema-instance";

var NODE_ELEMENT = 1;
var NODE_ATTRIBUTE = 2;
var NODE_TEXT = 3;
var STD_MARGIN_MICRONS_PROPERTY = "StdMarginInMicrons";
var TRAY_MARGIN_MICRONS_PROPERTY = "TrayMarginInMicrons";
var MANUAL_MARGIN_MICRONS_PROPERTY = "ManualMarginInMicrons";
var PDL_PROPERTY = "PDL";
var PDL_PS3 = "PS3";

// ***********************************************************************************************************************************************************************
//
// Print Ticket definitions
//
// ***********************************************************************************************************************************************************************

var JobBPECalibrationDue = {
    featureName: "JobBPECalibrationDue",
    featureNs: bpeNs,
    properties: [
        {
            propName: "SelectionType",
            propNameNs: psfNs,
            valueType: "xsd:QName",
            value: "psk:PickOne"
        }
    ],
    options: [
        {
            scoredProperties: [
                {
                    scoredPropertyName: "CalibrationFlag",
                    scoredPropertyNs: bpeNs,
                    valueType: "xsd:boolean",
                    value: "false"
                }
            ]
        }
    ]
};

var JobAPPrinterUtilityPath = {
    featureName: "JobAPPrinterUtilityPath",
    featureNs: bpeNs,
    properties: [
        {
            propName: "SelectionType",
            propNameNs: psfNs,
            valueType: "xsd:QName",
            value: "psk:PickOne"
        }
    ],
    options: [
        {
            scoredProperties: [
                {
                    scoredPropertyName: "FullyQualifiedPath",
                    scoredPropertyNs: bpeNs,
                    valueType: "xsd:string",
                    value: ""
                }
            ]
        }
    ]
};

var JobBPELastCalibration = {
    featureName: "JobBPELastCalibration",
    featureNs: bpeNs,
    properties: [
        {
            propName: "SelectionType",
            propNameNs: psfNs,
            valueType: "xsd:QName",
            value: "psk:PickOne"
        }
    ],
    options: [
        {
            scoredProperties: [
                {
                    scoredPropertyName: "TimeStamp",
                    scoredPropertyNs: bpeNs,
                    valueType: "xsd:integer",
                    value: "121212"
                }
            ]
        }
    ]
};


var scalingPC = {
    featureName: "PageScaling",
    featureNs: privateNs,
    defaultOptionName: "None",
    defaultOptionNs: pskNs,
    options: [
        {
            optionName: "None",
            optionNs: pskNs
        },
        {
            optionName: "CustomSquare",
            optionNs: pskNs,
            scoredProperties: [
                {
                    scoredPropertyName: "Scale",
                    scoredPropertyNs: pskNs,
                    paramRefName: "PageScalingScale",
                    paramRefNs: pskNs
                }
            ]
        },
        {
            optionName: "FitToPaper",
            optionNs: privateNs,
            scoredProperties: [
                {
                    scoredPropertyName: "PaperName",
                    scoredPropertyNs: privateNs,
                    paramRefName: "JobFitToPaperName",
                    paramRefNs: privateNs
                },
                {
                    scoredPropertyName: "PaperNameNs",
                    scoredPropertyNs: privateNs,
                    paramRefName: "JobFitToPaperNameNs",
                    paramRefNs: privateNs
                },
                {
                    scoredPropertyName: "PaperWidth",
                    scoredPropertyNs: privateNs,
                    paramRefName: "JobFitToPaperWidth",
                    paramRefNs: privateNs
                },
                {
                    scoredPropertyName: "PaperHeight",
                    scoredPropertyNs: privateNs,
                    paramRefName: "JobFitToPaperHeight",
                    paramRefNs: privateNs
                }
            ]
        },
        {
            optionName: "FitToRollWidth",
            optionNs: privateNs,
            scoredProperties: [
                {
                    scoredPropertyName: "PaperName",
                    scoredPropertyNs: privateNs,
                    paramRefName: "JobFitToPrintableAreaPaperName",
                    paramRefNs: privateNs
                },
                {
                    scoredPropertyName: "PaperNameNs",
                    scoredPropertyNs: privateNs,
                    paramRefName: "JobFitToPrintableAreaPaperNameNs",
                    paramRefNs: privateNs
                },
                {
                    scoredPropertyName: "PaperWidth",
                    scoredPropertyNs: privateNs,
                    paramRefName: "JobFitToPrintableAreaPaperWidth",
                    paramRefNs: privateNs
                },
                {
                    scoredPropertyName: "PaperHeight",
                    scoredPropertyNs: privateNs,
                    paramRefName: "JobFitToPrintableAreaPaperHeight",
                    paramRefNs: privateNs
                }
            ]
        }
    ],
    parameterDef: [
        {
            paramDefName: "PageScalingScale",
            paramDefNs: pskNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:integer"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:integer", value: "100"
                },
                {
                    propName: "MaxValue", propNameNs: psfNs, valueType: "xsd:integer", value: "1000"
                },
                {
                    propName: "MinValue", propNameNs: psfNs, valueType: "xsd:integer", value: "25"
                },
                {
                    propName: "Multiple", propNameNs: psfNs, valueType: "xsd:integer", value: "1"
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "percent"
                }
            ]
        },
        {
            paramDefName: "JobFitToPaperName",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: "Letter"
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: "128"
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        },
        {
            paramDefName: "JobFitToPaperNameNs",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: pskNs
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: "128"
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        },
        {
            paramDefName: "JobFitToPaperWidth",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:integer"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "MaxValue", propNameNs: psfNs, valueType: "xsd:integer", value: "1000000"
                },
                {
                    propName: "MinValue", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "Multiple", propNameNs: psfNs, valueType: "xsd:integer", value: "1"
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "microns"
                }
            ]
        },
        {
            paramDefName: "JobFitToPaperHeight",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:integer"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "MaxValue", propNameNs: psfNs, valueType: "xsd:integer", value: "1000000"
                },
                {
                    propName: "MinValue", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "Multiple", propNameNs: psfNs, valueType: "xsd:integer", value: "1"
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "microns"
                }
            ]
        },
        {
            paramDefName: "JobFitToPrintableAreaPaperName",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: "Letter"
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: "128"
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        },
        {
            paramDefName: "JobFitToPrintableAreaPaperNameNs",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: pskNs
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: "128"
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        },
        {
            paramDefName: "JobFitToPrintableAreaPaperWidth",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:integer"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "MaxValue", propNameNs: psfNs, valueType: "xsd:integer", value: "1000000"
                },
                {
                    propName: "MinValue", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "Multiple", propNameNs: psfNs, valueType: "xsd:integer", value: "1"
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "microns"
                }
            ]
        },
        {
            paramDefName: "JobFitToPrintableAreaPaperHeight",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:integer"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "MaxValue", propNameNs: psfNs, valueType: "xsd:integer", value: "1000000"
                },
                {
                    propName: "MinValue", propNameNs: psfNs, valueType: "xsd:integer", value: "0"
                },
                {
                    propName: "Multiple", propNameNs: psfNs, valueType: "xsd:integer", value: "1"
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "microns"
                }
            ]
        }
    ]
};

var customMediaPC =
{
    properties: [
        {
            psfNodeString: "ScoredProperty",
            propertyName: "MediaSizeWidth",
            propertyNs: pskNs,
            valueType: "xsd:integer",
            indexValue: 1
        },
        {
            psfNodeString: "ScoredProperty",
            propertyName: "MediaSizeHeight",
            propertyNs: pskNs,
            valueType: "xsd:integer",
            indexValue: 2
        },
        {
            psfNodeString: "Property",
            propertyName: "DisplayName",
            propertyNs: pskNs,
            valueType: "xsd:string",
            indexValue: 0
        }
    ],
    parameterInit: [
        {
            paramInitName: "PageMediaSizeMediaSizeWidth",
            paramInitNs: pskNs,
            valueType: "xsd:integer"
        },
        {
            paramInitName: "PageMediaSizeMediaSizeHeight",
            paramInitNs: pskNs,
            valueType: "xsd:integer"
        }
    ]
};

var customMediaOption =
{
    optionName: "CustomMediaSize",
    optionNs: pskNs,
    scoredProperties: [
        {
            scoredPropertyName: "MediaSizeWidth",
            scoredPropertyNs: pskNs,
            paramRefName: "PageMediaSizeMediaSizeWidth",
            paramRefNs: pskNs
        },
        {
            scoredPropertyName: "MediaSizeHeight",
            scoredPropertyNs: pskNs,
            paramRefName: "PageMediaSizeMediaSizeHeight",
            paramRefNs: pskNs
        }
    ]
};


var accountingPC =
{
    parameterDef: [
        {
            paramDefName: "JobAccountId",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: ""
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: 30
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        }
    ],
    parameterInit: [
        {
            paramInitName: "JobAccountId",
            paramInitNs: privateNs,
            valueType: "xsd:string"
        }
    ]
};

var colorAdjustmentLightnessPC =
{
    parameterDef: [
        {
            paramDefName: "PageColorAdjustmentLightness",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:integer"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "MaxValue", propNameNs: psfNs, valueType: "xsd:integer", value: 50
                },
                {
                    propName: "MinValue", propNameNs: psfNs, valueType: "xsd:integer", value: -50
                },
                {
                    propName: "Multiple", propNameNs: psfNs, valueType: "xsd:integer", value: 1
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "microns"
                }
            ]
        }
    ],
    parameterInit: [
        {
            paramInitName: "PageColorAdjustmentLightness",
            paramInitNs: privateNs,
            valueType: "xsd:integer"
        }
    ]
};

var colorAdjustmentRedPC =
{
    parameterDef: [
        {
            paramDefName: "PageColorAdjustmentRed",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:integer"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "MaxValue", propNameNs: psfNs, valueType: "xsd:integer", value: 50
                },
                {
                    propName: "MinValue", propNameNs: psfNs, valueType: "xsd:integer", value: -50
                },
                {
                    propName: "Multiple", propNameNs: psfNs, valueType: "xsd:integer", value: 1
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "microns"
                }
            ]
        }
    ],
    parameterInit: [
        {
            paramInitName: "PageColorAdjustmentRed",
            paramInitNs: privateNs,
            valueType: "xsd:integer"
        }
    ]
};

var colorAdjustmentGreenPC =
{
    parameterDef: [
        {
            paramDefName: "PageColorAdjustmentGreen",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:integer"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "MaxValue", propNameNs: psfNs, valueType: "xsd:integer", value: 50
                },
                {
                    propName: "MinValue", propNameNs: psfNs, valueType: "xsd:integer", value: -50
                },
                {
                    propName: "Multiple", propNameNs: psfNs, valueType: "xsd:integer", value: 1
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "microns"
                }
            ]
        }
    ],
    parameterInit: [
        {
            paramInitName: "PageColorAdjustmentGreen",
            paramInitNs: privateNs,
            valueType: "xsd:integer"
        }
    ]
};

var colorAdjustmentBluePC =
{
    parameterDef: [
        {
            paramDefName: "PageColorAdjustmentBlue",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:integer"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "MaxValue", propNameNs: psfNs, valueType: "xsd:integer", value: 50
                },
                {
                    propName: "MinValue", propNameNs: psfNs, valueType: "xsd:integer", value: -50
                },
                {
                    propName: "Multiple", propNameNs: psfNs, valueType: "xsd:integer", value: 1
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "microns"
                }
            ]
        }
    ],
    parameterInit: [
        {
            paramInitName: "PageColorAdjustmentBlue",
            paramInitNs: privateNs,
            valueType: "xsd:integer"
        }
    ]
};

var pinPC =
{
    parameterDef: [
        {
            paramDefName: "JobPin",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: ""
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: 4
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        }
    ],
    parameterInit: [
        {
            paramInitName: "JobPin",
            paramInitNs: privateNs,
            valueType: "xsd:string"
        }
    ]
};

var jobNamePC =
{
    parameterDef: [
        {
            paramDefName: "JobName",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: ""
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: 30
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        }
    ],
    parameterInit: [
        {
            paramInitName: "JobName",
            paramInitNs: privateNs,
            valueType: "xsd:string"
        }
    ]
};

var userNamePC =
{
    parameterDef: [
        {
            paramDefName: "JobUserName",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: ""
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: 30
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        }
    ],
    parameterInit: [
        {
            paramInitName: "JobUserName",
            paramInitNs: privateNs,
            valueType: "xsd:string"
        }
    ]
};

var resolutionPC =
{
    options: [
        {
            optionName: "_75dpi",
            optionNs: privateNs,
            properties: [
                {
                    psfNodeString: "Property",
                    propName: "DisplayName",
                    propNameNs: pskNs,
                    valueType: "xsd:string",
                    value: "75 x 75 dpi"
                }
            ],
            scoredProperties: [
                {
                    scoredPropertyName: "ResolutionX",
                    scoredPropertyNs: privateNs,
                    valueType: "xsd:integer",
                    value: 75
                },
                {
                    scoredPropertyName: "ResolutionY",
                    scoredPropertyNs: privateNs,
                    valueType: "xsd:integer",
                    value: 75
                }
            ]
        },
        {
            optionName: "_150dpi",
            optionNs: privateNs,
            properties: [
                {
                    psfNodeString: "Property",
                    propName: "DisplayName",
                    propNameNs: pskNs,
                    valueType: "xsd:string",
                    value: "150 x 150 dpi"
                }
            ],
            scoredProperties: [
                {
                    scoredPropertyName: "ResolutionX",
                    scoredPropertyNs: privateNs,
                    valueType: "xsd:integer",
                    value: 150
                },
                {
                    scoredPropertyName: "ResolutionY",
                    scoredPropertyNs: privateNs,
                    valueType: "xsd:integer",
                    value: 150
                }
            ]
        }
    ],
    parameterDef: [
        {
            paramDefName: "PageRenderResolution",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: ""
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: 10
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        }
    ],
    parameterInit: [
        {
            paramInitName: "PageRenderResolution",
            paramInitNs: privateNs,
            valueType: "xsd:string"
        }
    ]
};

var pageMediaTypePC =
{
    options: [
        {
            optionName: "",
            optionNs: privateNs,
            attributeName: "constrained",
            attributeNameNs: "",
            attributeValue: "psk:None",
            properties:
                [
                    {
                        psfNodeString: "Property",
                        propName: "DisplayName",
                        propNameNs: pskNs,
                        valueType: "xsd:string",
                        value: ""
                    }
                ]
        }
    ],
    parameterDef: [
        {
            paramDefName: "PageMediaTypeInit",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: ""
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: 128
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        },
        {
            paramDefName: "PageMediaTypeId",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: ""
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: 128
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        },
        {
            paramDefName: "PageMediaTypeDonorId",
            paramDefNs: privateNs,
            properties: [
                {
                    propName: "DataType", propNameNs: psfNs, valueType: "xsd:QName", value: "xsd:string"
                },
                {
                    propName: "DefaultValue", propNameNs: psfNs, valueType: "xsd:string", value: ""
                },
                {
                    propName: "MaxLength", propNameNs: psfNs, valueType: "xsd:integer", value: 128
                },
                {
                    propName: "MinLength", propNameNs: psfNs, valueType: "xsd:integer", value: 0
                },
                {
                    propName: "Mandatory", propNameNs: psfNs, valueType: "xsd:QName", value: "psk:Conditional"
                },
                {
                    propName: "UnitType", propNameNs: psfNs, valueType: "xsd:string", value: "characters"
                }
            ]
        }
    ],
    parameterInit: [
        {
            paramInitName: "PageMediaTypeInit",
            paramInitNs: privateNs,
            valueType: "xsd:string"
        },
        {
            paramInitName: "PageMediaTypeId",
            paramInitNs: privateNs,
            valueType: "xsd:string"
        },
        {
            paramInitName: "PageMediaTypeDonorId",
            paramInitNs: privateNs,
            valueType: "xsd:string"
        }
    ]
};

var resolutionValues =
{
    _75dpi: 75,
    _150dpi: 150,
    _300dpi: 300,
    _600dpi: 600,
    _1200dpi: 1200
};

var userMarginValues =
{
    _3mm: 3000,
    _5mm: 5000
};

// ***********************************************************************************************************************************************************************
//
// Entry functions of HPI constraints
//
// ***********************************************************************************************************************************************************************

function validatePrintTicket(printTicket, scriptContext) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be validated.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <returns type="Number" integer="true">
    ///     Integer value indicating validation status.
    ///         1 - Print ticket is valid and was not modified.
    ///         2 - Print ticket was modified to make it valid.
    ///         0 - Print ticket is invalid.
    /// </returns>
	// debugger;
    if (0 == changeResolutionBasedOnPrintMode(printTicket, scriptContext)) {
        return 1;
    }
    return 2;
}

function completePrintCapabilities(printTicket, scriptContext, printCapabilities) {
    /// <param name="printTicket" type="IPrintSchemaTicket" mayBeNull="true">
    ///     If not 'null', the print ticket's settings are used to customize the print capabilities.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printCapabilities" type="IPrintSchemaCapabilities">
    ///     Print capabilities object to be customized.
    /// </param>
    // debugger;

    if (null != printTicket) {
        updatePageImageableSize(printTicket, scriptContext, printCapabilities);
    }

    bpeSchemaAndFeaturesToPrintCapabilities(printCapabilities);

    addFeatureInTicket(printCapabilities, scalingPC.featureName, scalingPC.featureNs, scalingPC.options);
    addParameterDef(printCapabilities, scalingPC.parameterDef);
    addParameterDef(printCapabilities, accountingPC.parameterDef);
    addParameterDef(printCapabilities, colorAdjustmentLightnessPC.parameterDef);
    addParameterDef(printCapabilities, colorAdjustmentRedPC.parameterDef);
    addParameterDef(printCapabilities, colorAdjustmentGreenPC.parameterDef);
    addParameterDef(printCapabilities, colorAdjustmentBluePC.parameterDef);
    addParameterDef(printCapabilities, pinPC.parameterDef);
    addParameterDef(printCapabilities, userNamePC.parameterDef);
    addParameterDef(printCapabilities, jobNamePC.parameterDef);
    addParameterDef(printCapabilities, pageMediaTypePC.parameterDef);
    AddMediaTypesSynchronizedInCapabilities(printCapabilities, scriptContext);
    addResolutionRelatedCapabilities(printCapabilities, resolutionPC);
}

function convertPrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    // debugger;

    customPageSizePrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    correctPageSizeOrientationPrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    scalePrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    accountIdPrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    customMediaTypePrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    colorAdjustmentLightnessPrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    colorAdjustmentRedPrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    colorAdjustmentGreenPrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    colorAdjustmentBluePrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    pinPrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    JobNamePrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    UserNamePrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
    resolutionFeaturePrintTicketToDevMode(printTicket, scriptContext, devModeProperties);
}

function convertDevModeToPrintTicket(devModeProperties, scriptContext, printTicket) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>
    // debugger;

    customPageSizeFeatureDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    correctPageSizeOrientationDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    bpeSchemaAndFeaturesDevModeToPrintTicket(printTicket, devModeProperties);
    scaleDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    accountIdDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    CustomMediaTypeDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    colorAdjustmentLightnessDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    colorAdjustmentRedDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    colorAdjustmentGreenDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    colorAdjustmentBlueDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    pinDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    JobNameDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    UserNameDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
    resolutionFeatureDevModeToPrintTicket(scriptContext, printTicket, devModeProperties);
}



// ***********************************************************************************************************************************************************************
//
// Auxiliar functions for the management of the printCapabilities
//
// ***********************************************************************************************************************************************************************

function addResolutionRelatedCapabilities(printCapabilities, resolutionPC) {
    addParameterDef(printCapabilities, resolutionPC.parameterDef);
    var feature = printCapabilities.GetFeature("PageResolution", pskNs);
    var featureNode = feature.XmlNode;
    addOptionsToFeatureNode(featureNode, resolutionPC.options);
}

// ***********************************************************************************************************************************************************************
//
// Auxiliar functions for the management of the conversion of the print Ticket to DevMode
//
// ***********************************************************************************************************************************************************************

function scalePrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>

    var feature = printTicket.GetFeature("PageScaling", privateNs);

    if (feature != null) {
        var selectedOption = feature.SelectedOption;
        var selObj = {};

        if (null != selectedOption) {
            selObj.optionName = selectedOption.Name;
            selObj.optionNs = selectedOption.NamespaceUri;
            selObj.scoredPropertiesValues = "";

            for (var i = 0; i < selectedOption.XmlNode.childNodes.length; i++) {
                selObj.scoredPropertiesValues += selectedOption.XmlNode.childNodes[i].nodeTypedValue + " ";
            }

            var strScaling = objectToString(selObj);
            setDevModeProperty(devModeProperties, "Scaling", strScaling);
        }
    }
}

function accountIdPrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    var accountIdstr = getUserProperty(scriptContext, "AccountId");
    if (accountIdstr != null) {
        setDevModeProperty(devModeProperties, "AccountId", accountIdstr);
    }
}

function customMediaTypePrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    var customMediaTypestr = getUserProperty(scriptContext, "CustomMediaType");
    var customMediaId = getUserProperty(scriptContext, "PageMediaTypeId");
    var customDonorName = getUserProperty(scriptContext, "PageMediaTypeDonorId");


    if (customMediaTypestr != null) {
        setDevModeProperty(devModeProperties, "CustomMediaType", customMediaTypestr.length > 128 ? customMediaTypestr.substr(0, 128) : customMediaTypestr);
    }

    if (customMediaId != null) {
        setDevModeProperty(devModeProperties, "PageMediaTypeId", customMediaId.length > 64 ? customMediaId.substr(0, 64) : customMediaId);
    }

    if (customDonorName != null) {
        setDevModeProperty(devModeProperties, "PageMediaTypeDonorId", customDonorName.length > 64 ? customDonorName.substr(0, 64) : customDonorName);
    }
}

function colorAdjustmentLightnessPrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    var colorLightnessValue = getIntUserProperty(scriptContext, "ColorAdjustmentLightness");
    if (colorLightnessValue != null) {
        setIntDevModeProperty(devModeProperties, "ColorAdjustmentLightness", colorLightnessValue);
    }
}

function colorAdjustmentRedPrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    var colorRedValue = getIntUserProperty(scriptContext, "ColorAdjustmentRed");
    if (colorRedValue != null) {
        setIntDevModeProperty(devModeProperties, "ColorAdjustmentRed", colorRedValue);
    }
}

function colorAdjustmentGreenPrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    var colorGreenValue = getIntUserProperty(scriptContext, "ColorAdjustmentGreen");
    if (colorGreenValue != null) {
        setIntDevModeProperty(devModeProperties, "ColorAdjustmentGreen", colorGreenValue);
    }
}

function colorAdjustmentBluePrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    var colorBlueValue = getIntUserProperty(scriptContext, "ColorAdjustmentBlue");
    if (colorBlueValue != null) {
        setIntDevModeProperty(devModeProperties, "ColorAdjustmentBlue", colorBlueValue);
    }
}

function pinPrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    var pinStr = getUserProperty(scriptContext, "PinId");
    if (pinStr != null) {
        setDevModeProperty(devModeProperties, "PinId", pinStr);
    }
}

function JobNamePrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    var JobNameStr = getUserProperty(scriptContext, "JobNameId");
    if (JobNameStr != null) {
        setDevModeProperty(devModeProperties, "JobNameId", JobNameStr);
    }
}

function UserNamePrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    var UserNameStr = getUserProperty(scriptContext, "UserNameId");
    if (UserNameStr != null) {
        setDevModeProperty(devModeProperties, "UserNameId", UserNameStr);
    }
}


function resolutionFeaturePrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted to DevMode.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>

    var renderStr = getUserProperty(scriptContext, "resolutionApp");
    if (renderStr != null) {
        setDevModeProperty(devModeProperties, "RenderRes", renderStr);
    }
}

function customPageSizePrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    var feature = printTicket.GetFeature("PageMediaSize");
    if (feature == null || feature.selectedOption == null || feature.selectedOption.Name != "CustomMediaSize") {
        setIntDevModeProperty(devModeProperties, "PageMediaSizeMediaSizeWidth", 0);
        setIntDevModeProperty(devModeProperties, "PageMediaSizeMediaSizeHeight", 0);
        return;
    }
    var rootNode = printTicket.XmlNode;
    var pageSizeOptionWidth = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeWidth");
    var pageSizeOptionHeight = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeHeight");
    if (!pageSizeOptionWidth || !pageSizeOptionHeight) {
        return;
    }
    var width = getParameterInitValue(pageSizeOptionWidth);
    var height = getParameterInitValue(pageSizeOptionHeight);
    setIntDevModeProperty(devModeProperties, "PageMediaSizeMediaSizeWidth", width);
    setIntDevModeProperty(devModeProperties, "PageMediaSizeMediaSizeHeight", height);
}

function correctPageSizeOrientationPrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    var feature = printTicket.GetFeature("PageMediaSize");
    var featureOrientation = printTicket.GetFeature("PageOrientation");
    if (feature == null || feature.selectedOption == null || featureOrientation == null || featureOrientation.selectedOption == null || featureOrientation.selectedOption.Name != "Landscape") {
        setIntDevModeProperty(devModeProperties, "PageMediaSizeWidth", 0);
        setIntDevModeProperty(devModeProperties, "PageMediaSizeHeight", 0);
        setDevModeProperty(devModeProperties, "PageMediaSizeName", "");
        setDevModeProperty(devModeProperties, "PageMediaSizeNs", "");
        return;
    }

    var rootNode = printTicket.XmlNode;
    var pageSizeOptionWidth = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeWidth");
    var pageSizeOptionHeight = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeHeight");
    var width = 0;
    var height = 0;
    if (!pageSizeOptionWidth || !pageSizeOptionHeight) {
        var propertyNodeWidth = getScoredProperty(feature.selectedOption.XmlNode, pskNs, "MediaSizeWidth");
        var propertyNodeHeight = getScoredProperty(feature.selectedOption.XmlNode, pskNs, "MediaSizeHeight");
        if (!propertyNodeWidth || !propertyNodeHeight) {
            setIntDevModeProperty(devModeProperties, "PageMediaSizeWidth", 0);
            setIntDevModeProperty(devModeProperties, "PageMediaSizeHeight", 0);
            setDevModeProperty(devModeProperties, "PageMediaSizeName", "");
            setDevModeProperty(devModeProperties, "PageMediaSizeNs", "");
            return;
        }
        width = getValueFromFirstValueNode(propertyNodeWidth);
        height = getValueFromFirstValueNode(propertyNodeHeight);
    } else {
        width = getParameterInitValue(pageSizeOptionWidth);
        height = getParameterInitValue(pageSizeOptionHeight);
    }

    setDevModeProperty(devModeProperties, "PageMediaSizeName", feature.selectedOption.Name);
    setDevModeProperty(devModeProperties, "PageMediaSizeNs", feature.selectedOption.NamespaceUri);
    setIntDevModeProperty(devModeProperties, "PageMediaSizeWidth", width);
    setIntDevModeProperty(devModeProperties, "PageMediaSizeHeight", height);
}



function AddMediaTypesSynchronizedInCapabilities(printCapabilities, scriptContext) {
    var mediaOptions = getUserProperty(scriptContext, "mediaTypesSync");
    var feature = printCapabilities.GetFeature("PageMediaType");
    var featureNode = feature.XmlNode;

    //We need to retrieve here the options.
    if (mediaOptions != null) {
        var mediaPapersArray = mediaOptions.split(";;");

        for (var i = 0; i < mediaPapersArray.length - 1; i++) {
            var medianame = mediaPapersArray[i].split(";");
            pageMediaTypePC.options[0].optionName = medianame[2].length > 64 ? medianame[2].substr(0, 64) : medianame[2];;
            pageMediaTypePC.options[0].properties[0].value = medianame[0].length > 128 ? medianame[0].substr(0, 128) : medianame[0];

            addOptionsToFeatureNode(featureNode, pageMediaTypePC.options);
        }
    }
}

function bpeSchemaAndFeaturesToPrintCapabilities(printCapabilities) {
    /// <param name="printTicket" type="IPrintSchemaTicket" mayBeNull="true">
    ///     If not 'null', the print ticket's settings are used to customize the print capabilities.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printCapabilities" type="IPrintSchemaCapabilities">
    ///     Print capabilities object to be customized.
    /// </param>

    setNamespace(printCapabilities.XmlNode, bpePrefix, bpeNs);

    var featureNode = addFeatureInTicket(printCapabilities, JobBPECalibrationDue.featureName, JobBPECalibrationDue.featureNs, JobBPECalibrationDue.options);
    addPropertiesToNode(featureNode, JobBPECalibrationDue.properties);

    featureNode = addFeatureInTicket(printCapabilities, JobBPELastCalibration.featureName, JobBPELastCalibration.featureNs, JobBPELastCalibration.options);
    addPropertiesToNode(featureNode, JobBPELastCalibration.properties);

    featureNode = addFeatureInTicket(printCapabilities, JobAPPrinterUtilityPath.featureName, JobAPPrinterUtilityPath.featureNs, JobAPPrinterUtilityPath.options);
    addPropertiesToNode(featureNode, JobAPPrinterUtilityPath.properties);

}

// ***********************************************************************************************************************************************************************
//
// Auxiliar functions for the management of the conversion of DevMode to the print Ticket
//
// ***********************************************************************************************************************************************************************

function resolutionFeatureDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>
    var resolutionValue = getDevModeProperty(devModeProperties, "RenderRes");
    var xmlDoc = printTicket.xmlNode;
    var rootNode = xmlDoc.documentElement;
    var renderRes = getParameterInit(rootNode, privateNs, "PageRenderResolution");

    if (renderRes != null) {
        xmlDoc.documentElement.removeChild(renderRes);
    }

    if (resolutionValue != "") {
        addParameterInit(printTicket, resolutionPC.parameterInit[0], resolutionValue);
    }
    else {
        addParameterInit(printTicket, resolutionPC.parameterInit[0], "_600dpi");
    }
}

function customPageSizeFeatureDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    var feature = printTicket.GetFeature("PageMediaSize");
    if (feature == null || feature.selectedOption == null)
        return;
    var pageSizeOptionWidth = getIntDevModeProperty(devModeProperties, "PageMediaSizeMediaSizeWidth");
    var pageSizeOptionHeight = getIntDevModeProperty(devModeProperties, "PageMediaSizeMediaSizeHeight");
    if (!pageSizeOptionWidth || !pageSizeOptionHeight || pageSizeOptionWidth == "0" || pageSizeOptionHeight == "0")
        return;

    var rootNode = printTicket.XmlNode;
    var paramInitWidth = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeWidth");
    var paramInitHeight = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeHeight");
    var width;
    var height;
    if (!paramInitWidth || !paramInitHeight) {
        var selectedOptionXmlNode = feature.selectedOption.XmlNode;
        var propertyNodeWidth = getScoredProperty(selectedOptionXmlNode, pskNs, "MediaSizeWidth");
        var propertyNodeHeight = getScoredProperty(selectedOptionXmlNode, pskNs, "MediaSizeHeight");
        if (!propertyNodeWidth || !propertyNodeHeight) {
            return;
        }
        width = getValueFromFirstValueNode(propertyNodeWidth);
        height = getValueFromFirstValueNode(propertyNodeHeight);
    } else {
        width = getParameterInitValue(paramInitWidth);
        height = getParameterInitValue(paramInitHeight);
    }

    if (width == pageSizeOptionWidth && height == pageSizeOptionHeight) {
        return;
    }

    var featureNode = feature.XmlNode;
    if (feature.selectedOption.Name != "CustomMediaSize") {
        featureNode.removeChild(featureNode.firstChild);
        addOptionsToFeatureNode(featureNode, [customMediaOption]);
    }
    var ptMediaSizeWidth = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeWidth");
    var ptMediaSizeHeight = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeHeight");
    if (ptMediaSizeWidth == null || ptMediaSizeHeight == null) {
        addParameterInit(printTicket, customMediaPC.parameterInit[0], pageSizeOptionWidth);
        addParameterInit(printTicket, customMediaPC.parameterInit[1], pageSizeOptionHeight);
    } else {
        setParameterInitValue(ptMediaSizeWidth, pageSizeOptionWidth);
        setParameterInitValue(ptMediaSizeHeight, pageSizeOptionHeight);
    }
}

function correctPageSizeOrientationDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    var feature = printTicket.GetFeature("PageMediaSize");
    var featureOrientation = printTicket.GetFeature("PageOrientation");
    if (feature == null || feature.selectedOption == null || featureOrientation == null || featureOrientation.selectedOption == null || featureOrientation.selectedOption.Name != "Landscape") {
        return;
    }

    var pageSizeOptionName = getDevModeProperty(devModeProperties, "PageMediaSizeName");
    var pageSizeOptionNs = getDevModeProperty(devModeProperties, "PageMediaSizeNs");
    var pageSizeOptionWidth = getIntDevModeProperty(devModeProperties, "PageMediaSizeWidth");
    var pageSizeOptionHeight = getIntDevModeProperty(devModeProperties, "PageMediaSizeHeight");
    if (!pageSizeOptionName || !pageSizeOptionNs || !pageSizeOptionWidth || !pageSizeOptionHeight || pageSizeOptionName == "" || pageSizeOptionNs == "" || pageSizeOptionWidth == 0 || pageSizeOptionHeight == 0) {
        return;
    }

    var rootNode = printTicket.XmlNode;
    var parInitMediaSizeWidth = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeWidth");
    var parInitMediaSizeHeight = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeHeight");
    var width, height;
    if (parInitMediaSizeWidth == null || parInitMediaSizeHeight == null) {
        width = feature.SelectedOption.WidthInMicrons;
        height = feature.SelectedOption.HeightInMicrons;
    } else {
        width = getParameterInitValue(parInitMediaSizeWidth);
        height = getParameterInitValue(parInitMediaSizeHeight);
    }

    var sameDimensions = width == pageSizeOptionWidth && height == pageSizeOptionHeight;

    if (sameDimensions && (feature.SelectedOption.Name == pageSizeOptionName) ||
        (feature.SelectedOption.Name != "CustomMediaSize" && pageSizeOptionName == "CustomMediaSize")) {
        return;
    }

    var featureNode = feature.XmlNode;
    featureNode.removeChild(featureNode.firstChild);

    if (pageSizeOptionName == "CustomMediaSize") {
        addOptionsToFeatureNode(featureNode, [customMediaOption]);
        if (parInitMediaSizeWidth == null || parInitMediaSizeHeight == null) {
            addParameterInit(printTicket, customMediaPC.parameterInit[0], pageSizeOptionWidth);
            addParameterInit(printTicket, customMediaPC.parameterInit[1], pageSizeOptionHeight);
        } else {
            setParameterInitValue(parInitMediaSizeWidth, pageSizeOptionWidth);
            setParameterInitValue(parInitMediaSizeHeight, pageSizeOptionHeight);
        }

        return;
    }

    if (parInitMediaSizeWidth != null) {
        rootNode.documentElement.removeChild(parInitMediaSizeWidth);
    }

    if (parInitMediaSizeHeight != null) {
        rootNode.documentElement.removeChild(parInitMediaSizeHeight);
    }

    var mediaOption =
    {
        optionName: pageSizeOptionName,
        optionNs: pageSizeOptionNs,
        scoredProperties: [
            {
                scoredPropertyName: "MediaSizeWidth",
                scoredPropertyNs: pskNs
            },
            {
                scoredPropertyName: "MediaSizeHeight",
                scoredPropertyNs: pskNs
            }
        ]
    };
    addOptionsToFeatureNode(featureNode, [mediaOption], [pageSizeOptionWidth, pageSizeOptionHeight]);
}

function accountIdDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>
    var account = getDevModeProperty(devModeProperties, "AccountId");
    var xmlDoc = printTicket.xmlNode;
    var rootNode = xmlDoc.documentElement;
    var accountId = getParameterInit(rootNode, privateNs, "JobAccountId");

    if (accountId != null) {
        xmlDoc.documentElement.removeChild(accountId);
    }

    if (account != "") {
        addParameterInit(printTicket, accountingPC.parameterInit[0], account);
    }
}

function CustomMediaTypeDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>

    var xmlDoc = printTicket.xmlNode;
    var rootNode = xmlDoc.documentElement;

    var customMediaName = getDevModeProperty(devModeProperties, "CustomMediaType");
    var customMediaId = getDevModeProperty(devModeProperties, "PageMediaTypeId");
    var customMediaDonor = getDevModeProperty(devModeProperties, "PageMediaTypeDonorId");

    // Get parameterInits
    var customMediaTypeName = getParameterInit(rootNode, privateNs, "PageMediaTypeInit");
    var customMediaTypeId = getParameterInit(rootNode, privateNs, "PageMediaTypeId");
    var customMediaTypeDonor = getParameterInit(rootNode, privateNs, "PageMediaTypeDonorId");

    if (customMediaTypeName != null) {
        xmlDoc.documentElement.removeChild(customMediaTypeName);
    }
    if (customMediaTypeId != null) {
        xmlDoc.documentElement.removeChild(customMediaTypeId);
    }
    if (customMediaTypeDonor != null) {
        xmlDoc.documentElement.removeChild(customMediaTypeDonor);
    }

    if (customMediaName !== "") {
        addParameterInit(printTicket, pageMediaTypePC.parameterInit[0], customMediaName);
    }

    if (customMediaId !== "") {
        addParameterInit(printTicket, pageMediaTypePC.parameterInit[1], customMediaId);
    }
    if (customMediaDonor !== "") {
        addParameterInit(printTicket, pageMediaTypePC.parameterInit[2], customMediaDonor);
    }
}

function colorAdjustmentLightnessDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>
    var colorLightnessValue = getIntDevModeProperty(devModeProperties, "ColorAdjustmentLightness");
    var xmlDoc = printTicket.xmlNode;
    var rootNode = xmlDoc.documentElement;
    var lightnessColorPI = getParameterInit(rootNode, privateNs, "PageColorAdjustmentLightness");

    if (lightnessColorPI != null) {
        xmlDoc.documentElement.removeChild(lightnessColorPI);
    }

    if (colorLightnessValue != null) {
        addParameterInit(printTicket, colorAdjustmentLightnessPC.parameterInit[0], colorLightnessValue);
    }
}

function colorAdjustmentRedDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>
    var colorRedValue = getIntDevModeProperty(devModeProperties, "ColorAdjustmentRed");
    var xmlDoc = printTicket.xmlNode;
    var rootNode = xmlDoc.documentElement;
    var redColorPI = getParameterInit(rootNode, privateNs, "PageColorAdjustmentRed");

    if (redColorPI != null) {
        xmlDoc.documentElement.removeChild(redColorPI);
    }

    if (colorRedValue != null) {
        addParameterInit(printTicket, colorAdjustmentRedPC.parameterInit[0], colorRedValue);
    }
}

function colorAdjustmentGreenDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>
    var colorGreenValue = getIntDevModeProperty(devModeProperties, "ColorAdjustmentGreen");
    var xmlDoc = printTicket.xmlNode;
    var rootNode = xmlDoc.documentElement;
    var greenColorPI = getParameterInit(rootNode, privateNs, "PageColorAdjustmentGreen");

    if (greenColorPI != null) {
        xmlDoc.documentElement.removeChild(greenColorPI);
    }

    if (colorGreenValue != null) {
        addParameterInit(printTicket, colorAdjustmentGreenPC.parameterInit[0], colorGreenValue);
    }
}

function colorAdjustmentBlueDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>
    var colorBlueValue = getIntDevModeProperty(devModeProperties, "ColorAdjustmentBlue");
    var xmlDoc = printTicket.xmlNode;
    var rootNode = xmlDoc.documentElement;
    var blueColorPI = getParameterInit(rootNode, privateNs, "PageColorAdjustmentBlue");

    if (blueColorPI != null) {
        xmlDoc.documentElement.removeChild(blueColorPI);
    }

    if (colorBlueValue != null) {
        addParameterInit(printTicket, colorAdjustmentBluePC.parameterInit[0], colorBlueValue);
    }
}

function pinDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>
    var pin = getDevModeProperty(devModeProperties, "PinId");
    var xmlDoc = printTicket.xmlNode;
    var rootNode = xmlDoc.documentElement;
    var pinId = getParameterInit(rootNode, privateNs, "JobPin");

    if (pinId != null) {
        xmlDoc.documentElement.removeChild(pinId);
    }

    if (pin != "") {
        addParameterInit(printTicket, pinPC.parameterInit[0], pin);
    }
}

function JobNameDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>
    var jobName = getDevModeProperty(devModeProperties, "JobNameId");
    var xmlDoc = printTicket.xmlNode;
    var rootNode = xmlDoc.documentElement;
    var jobNameId = getParameterInit(rootNode, privateNs, "JobName");

    if (jobNameId != null) {
        xmlDoc.documentElement.removeChild(jobNameId);
    }

    if (jobName != "") {
        addParameterInit(printTicket, jobNamePC.parameterInit[0], jobName);
    }
}

function UserNameDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>
    var userName = getDevModeProperty(devModeProperties, "UserNameId");
    var xmlDoc = printTicket.xmlNode;
    var rootNode = xmlDoc.documentElement;
    var userNameId = getParameterInit(rootNode, privateNs, "JobUserName");

    if (userNameId != null) {
        xmlDoc.documentElement.removeChild(userNameId);
    }

    if (userName != "") {
        addParameterInit(printTicket, userNamePC.parameterInit[0], userName);
    }
}

function bpeSchemaAndFeaturesDevModeToPrintTicket(printTicket, devModeProperties) {

    setNamespace(printTicket.XmlNode, bpePrefix, bpeNs);

    if (null == printTicket.GetFeature(JobBPECalibrationDue.featureName, bpeNs)) {
        addFeatureInTicket(printTicket, JobBPECalibrationDue.featureName, JobBPECalibrationDue.featureNs, JobBPECalibrationDue.options);
    }

    if (null == printTicket.GetFeature(JobBPELastCalibration.featureName, bpeNs)) {
        addFeatureInTicket(printTicket, JobBPELastCalibration.featureName, JobBPELastCalibration.featureNs, JobBPELastCalibration.options);
    }

    if (null == printTicket.GetFeature(JobAPPrinterUtilityPath.featureName, bpeNs)) {
        addFeatureInTicket(printTicket, JobAPPrinterUtilityPath.featureName, JobAPPrinterUtilityPath.featureNs, JobAPPrinterUtilityPath.options);

    }
}

function scaleDevModeToPrintTicket(scriptContext, printTicket, devModeProperties) {
    /// <param name="devModeProperties" type="IPrinterScriptablePropertyBag">
    ///     The DevMode property bag.
    /// </param>
    /// <param name="scriptContext" type="IPrinterScriptContext">
    ///     Script context object.
    /// </param>
    /// <param name="printTicket" type="IPrintSchemaTicket">
    ///     Print ticket to be converted from the DevMode.
    /// </param>

    if (null == printTicket.GetFeature("PageScaling", privateNs)) {
        var scale = getDevModeProperty(devModeProperties, "Scaling");
        var values = null;
        var optionName = null;
        var optionNs = null;

        if (scale != "") {
            var obj;
            try {
                obj = eval("(" + scale + ")");
                values = obj.scoredPropertiesValues.split(" ");
                optionName = obj.optionName;
                optionNs = obj.optionNs;
            } catch (e) {
                // Not failing. Using defaults
            }
        }
        if (values == null || optionName == null || optionNs == null) {
            values = scalingPC.defaultOptionProp; // var isnt definitiion
            optionName = scalingPC.defaultOptionName;
            optionNs = scalingPC.defaultOptionNs;
        }

        var opt = [];
        for (var i = 0; i < scalingPC.options.length; i++) {
            if (scalingPC.options[i].optionName == optionName && scalingPC.options[i].optionNs == optionNs) {
                opt.push(scalingPC.options[i]);
                addFeatureInTicket(printTicket, scalingPC.featureName, scalingPC.featureNs, opt, values);
                break;
            }
        }
    }
    changeResolutionBasedOnPrintMode(printTicket, scriptContext);
}

// ***********************************************************************************************************************************************************************
//
// Auxiliar functions for feature management
//
// ***********************************************************************************************************************************************************************

function isPCL3BertRotationNeeded(pageImageableSize, scriptContext, inputBinName) {
    var platform = scriptContext.DriverProperties.GetString("Platform");

    return inputBinName == "Tray"
        && pageImageableSize.ImageableSizeHeightInMicrons < pageImageableSize.ImageableSizeWidthInMicrons
        && (platform == "Sirius" || platform == "Dune");
}

function changeResolutionBasedOnPrintMode(printTicket, scriptContext) {

    var ptResolution = printTicket.GetFeature("PageResolution");
    if (ptResolution == null) {
        return 0;
    }

    var pmNumber = getPrintModeNumber(printTicket);
    var paperTypeFamily = getPaperTypeFamily(printTicket, scriptContext);
    if (paperTypeFamily != null) {
        var key = paperTypeFamily + "-" + pmNumber;
        var appRes = getAppResolutionNameFromKey(key, scriptContext);
        var selectedResolutionOption = ptResolution.SelectedOption;

        if (appRes != null && selectedResolutionOption.Name != appRes) {
            var optionNode = selectedResolutionOption.XmlNode;
            var resolutionValue = resolutionValues[appRes];
            if (resolutionValue != null) {
                setSubPropertyValue(optionNode, pskNs, "ResolutionX", resolutionValue);
                setSubPropertyValue(optionNode, pskNs, "ResolutionY", resolutionValue);
                var nameAttribute = optionNode.attributes[0];
                if (nameAttribute != null) {
                    nameAttribute.text = nameAttribute.text.split(":")[0] + ":" + appRes;
                }
            }
        }
    }

    return 0;
}

function IsNeededToReportMargin0ToTheApplication(ptRemoveBlankAreas, ptMarginLayoutFeature) {

    var margin0ReportedToApp = false;

	// Cases when the margins reported to the application should be 0
    if (ptRemoveBlankAreas.SelectedOption.Name == "ON"
        || ptMarginLayoutFeature.SelectedOption.Name == "ClipContentsByMargins"
        || ptMarginLayoutFeature.SelectedOption.Name == "BorderlessAutomatic"
        || ptMarginLayoutFeature.SelectedOption.Name == "BorderlessManual"
        || ptMarginLayoutFeature.SelectedOption.Name == "Oversize") {

        margin0ReportedToApp = true;
    }

    return margin0ReportedToApp;
}

function updatePageImageableSize(printTicket, scriptContext, printCapabilities) {
    // debugger;
    fixPageImageableSizeForCustoms(printCapabilities.PageImageableSize, printTicket);

    var ptMarginLayoutFeature = printTicket.GetFeature("JobMarginsLayout", privateNs);
    var ptRemoveBlankAreas = printTicket.GetFeature("JobRemoveBlankAreas", privateNs);

    if (ptRemoveBlankAreas == null || ptMarginLayoutFeature == null) {
        return;
    }

    if (IsNeededToReportMargin0ToTheApplication(ptRemoveBlankAreas, ptMarginLayoutFeature)) {
        setPageImageableSizeBasedOnMargins(printCapabilities.PageImageableSize, 0, 0, 0, 0);
        return;
    }

    var ptJobInputBinFeature = printTicket.GetFeature("JobInputBin");
    var ptPageOrientationFeature = printTicket.GetFeature("PageOrientation");

    if (ptJobInputBinFeature == null || ptPageOrientationFeature == null) {
        return;
    }

    var ptJobInputBinOption = ptJobInputBinFeature.SelectedOption;
    var ptPageOrientationOption = ptPageOrientationFeature.SelectedOption;

    var stdMargin = getUserMarginsValue(printTicket, scriptContext);

    var margins =
    {
        top: stdMargin,
        left: stdMargin,
        right: stdMargin,
        bottom: this.getBottomMarginBasedOnInputBin(stdMargin, scriptContext.DriverProperties, ptJobInputBinOption.Name)
    };

    if (ptPageOrientationOption.Name == "Landscape") {
        var pdl = scriptContext.DriverProperties.GetString(PDL_PROPERTY);
        if (pdl == PDL_PS3) {
            var temp = margins.left;
            margins.left = margins.bottom;
            margins.bottom = temp;
        }
    }

    updateSelectedMarginsBasedOnRotationAndMirror(printTicket, margins, printCapabilities.PageImageableSize, scriptContext, ptJobInputBinOption.Name);

    var scalingFactor = getMarginScaleFactor(printTicket);
    var ptScalingMode = printTicket.GetFeature("PageScaling", privateNs);

    if (ptScalingMode.selectedOption.name == "FitToRollWidth") {
        setPageImageableSizeBasedOnMargins(printCapabilities.PageImageableSize, 0, 0, 0, 0);
    }
    else {
        setPageImageableSizeBasedOnMargins(printCapabilities.PageImageableSize,
            Math.ceil(margins.top * scalingFactor),
            Math.ceil(margins.left * scalingFactor),
            Math.ceil(margins.right * scalingFactor),
            Math.ceil(margins.bottom * scalingFactor));
    }
}

function updateSelectedMarginsBasedOnRotationAndMirror(printTicket, selectedMargins, pageImageableSize, scriptContext, inputBinName) {
    var rotateFeature = printTicket.GetFeature("JobRotate", privateNs);

    if (rotateFeature != null) {
        var selectedOption = rotateFeature.SelectedOption;
        if (selectedOption != null) {
            var bottomMargin = selectedMargins.bottom;
            switch (selectedOption.Name) {
                case "Rotate90":
                    bottomMargin = selectedMargins.left;
                    selectedMargins.left = selectedMargins.bottom;
                    break;
                case "Rotate180":
                    bottomMargin = selectedMargins.top;
                    selectedMargins.top = selectedMargins.bottom;
                    break;
                case "Rotate270":
                    bottomMargin = selectedMargins.right;
                    selectedMargins.right = selectedMargins.bottom;
                    break;
                default:
                    if (isPCL3BertRotationNeeded(pageImageableSize, scriptContext, inputBinName)) {
                        bottomMargin = selectedMargins.left;
                        selectedMargins.left = selectedMargins.bottom;
                    }
            }

            selectedMargins.bottom = bottomMargin;
        }
    }

    // Important!!
    // This works as long as in transformation are done in the following order, first mirror and then
    // rotate. Otherwise this logic should be changed.
    var mirrorFeature = printTicket.GetFeature("PageMirrorImage");

    if (mirrorFeature != null) {
        var auxMargin;
        if (mirrorFeature.SelectedOption.Name == "MirrorImageHeight") {
            auxMargin = selectedMargins.top;
            selectedMargins.top = selectedMargins.bottom;
            selectedMargins.bottom = auxMargin;
        }
        else if (mirrorFeature.SelectedOption.Name == "MirrorImageWidth") {
            auxMargin = selectedMargins.right;
            selectedMargins.right = selectedMargins.left;
            selectedMargins.left = auxMargin;
        }
    }
}

function setPageImageableSizeBasedOnMargins(pageImageableSize, topMargin, leftMargin, rightMargin, bottomMargin) {
    var pageImageableSizeXmlNode = pageImageableSize.XmlNode;
    setSubPropertyValue(pageImageableSizeXmlNode, pskNs, "OriginHeight", topMargin);
    setSubPropertyValue(pageImageableSizeXmlNode, pskNs, "OriginWidth", leftMargin);
    var imageableSizeWidthInMicrons = pageImageableSize.ImageableSizeWidthInMicrons;
    var imageableSizeHeightInMicrons = pageImageableSize.ImageableSizeHeightInMicrons;
    setSubPropertyValue(pageImageableSizeXmlNode, pskNs, "ExtentWidth", imageableSizeWidthInMicrons - leftMargin - rightMargin);
    setSubPropertyValue(pageImageableSizeXmlNode, pskNs, "ExtentHeight", imageableSizeHeightInMicrons - topMargin - bottomMargin);
}

function fixPageImageableSizeForCustoms(pageImageableSize, printTicket) {
    var feature = printTicket.GetFeature("PageMediaSize");
    if (feature == null || feature.selectedOption == null || feature.selectedOption.Name != "CustomMediaSize") {
        return;
    }

    var rootNode = printTicket.XmlNode;
    var pageSizeOptionWidth = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeWidth");
    var pageSizeOptionHeight = getParameterInit(rootNode, pskNs, "PageMediaSizeMediaSizeHeight");
    if (!pageSizeOptionWidth || !pageSizeOptionHeight) {
        return;
    }
    var width = getParameterInitValue(pageSizeOptionWidth);
    var height = getParameterInitValue(pageSizeOptionHeight);

    var pageImageableSizeXmlNode = pageImageableSize.XmlNode;

    setSubPropertyValue(pageImageableSizeXmlNode, pskNs, "OriginHeight", 0);
    setSubPropertyValue(pageImageableSizeXmlNode, pskNs, "OriginWidth", 0);
    setSubPropertyValue(pageImageableSizeXmlNode, pskNs, "ExtentWidth", width);
    setSubPropertyValue(pageImageableSizeXmlNode, pskNs, "ExtentHeight", height);
    setSubPropertyValue(pageImageableSizeXmlNode, pskNs, "ImageableSizeWidth", width);
    setSubPropertyValue(pageImageableSizeXmlNode, pskNs, "ImageableSizeHeight", height);
}

function getBottomMarginBasedOnInputBin(stdMargin, driverProperties, inputBinName) {
    var bottomMargin = stdMargin;
    switch (inputBinName) {
        case "Manual":
        case "SheetFeeder":
            bottomMargin = driverProperties.GetInt32(MANUAL_MARGIN_MICRONS_PROPERTY);
            break;
        case "Tray":
            bottomMargin = driverProperties.GetInt32(TRAY_MARGIN_MICRONS_PROPERTY);
            break;
    }
    return bottomMargin;
}

function getPrintModeNumber(printTicket) {
    var economodeFeature = printTicket.GetFeature("JobEconomode", privateNs);
    var pageQualityFeature = printTicket.GetFeature("PageOutputQuality");
    var maxDetailFeature = printTicket.GetFeature("JobMaxDetail", privateNs);
    var morePassesFeature = printTicket.GetFeature("JobMorePasses", privateNs);
    var unidirectionalFeature = printTicket.GetFeature("JobUnidirectional", privateNs);

    var value = 0;
    if (economodeFeature != null) {
        if (economodeFeature.SelectedOption.Name != "OFF") {
            value |= 1 << 4;
        }
    }

    if (maxDetailFeature != null) {
        if (maxDetailFeature.SelectedOption.Name != "OFF") {
            value |= 1 << 5;
        }
    }

    if (morePassesFeature != null) {
        if (morePassesFeature.SelectedOption.Name != "OFF") {
            value |= 1 << 6;
        }
    }

    if (unidirectionalFeature != null) {
        if (unidirectionalFeature.SelectedOption.Name != "OFF") {
            value |= 1 << 7;
        }
    }

    if (pageQualityFeature != null) {
        switch (pageQualityFeature.SelectedOption.Name) {
            case "Normal":
                value |= 1;
                break;
            case "High":
                value |= 2;
                break;
            case "LinesFast":
                value |= 3;
                break;
            case "UniformAreas":
                value |= 4;
                break;
            case "HighDetail":
                value |= 5;
                break;
        }
    }

    return value;
}

function getPaperTypeFamily(printTicket, scriptContext) {
    // debugger;
    var familyName = null;
    var paperTypeFeature = printTicket.GetFeature("PageMediaType");
    if (paperTypeFeature != null) {
        var conversionTableStr = scriptContext.DriverProperties.GetString("FamilyPaperType");
        if (conversionTableStr != null) {
            var conversionTable = eval("(" + conversionTableStr + ")");

            var paperTypeInfo = conversionTable[paperTypeFeature.SelectedOption.Name];
            familyName = paperTypeInfo["PMCategory"];
        }
    }

    return familyName;
}

// Function to find the value of resolution. We need this to ensure that the application resolution is the resolution that the user chose in the UI.
function getAppResolutionNameFromKey(key, scriptContext) {
    try {
        var pmInfo = getUserProperty(scriptContext, "resolutionApp");
        return pmInfo;
    } catch (e) {
        return null;
    }
}

function getMarginScaleFactor(printTicket) {
    var ptPageScalingOption = printTicket.GetFeature("PageScaling", privateNs).SelectedOption;
    var scaleFactor;
    if (ptPageScalingOption.Name != "FitToPaper" && ptPageScalingOption.Name != "FitToRollWidth") {
        scaleFactor = getScalingPercentageFactor(ptPageScalingOption);
    } else {
        scaleFactor = getFitToPaperScalingFactor(printTicket, ptPageScalingOption);
    }

    return 1 / scaleFactor;
}

function getScalingPercentageFactor(ptPageScalingOption) {
    var propertyNode = getScoredProperty(ptPageScalingOption.XmlNode, pskNs, "Scale");
    var scalingFactor = 1;

    /*Option different of None is Selected*/
    if (null != propertyNode) {
        scalingFactor = getValueFromFirstValueNode(propertyNode) / 100.0;
    }

    return scalingFactor;
}

function getFitToPaperScalingFactor(printTicket, ptPageScalingOption) {
    var pageSizeOption = printTicket.GetFeature("PageMediaSize").SelectedOption;
    var pageSizeOptionWidth;
    var pageSizeOptionHeight

    // Word does not provide pagemedia size option in PT
    if (pageSizeOption == null) {
        return 1;
    }
    try {
        pageSizeOptionWidth = getValueFromFirstValueNode(getScoredProperty(pageSizeOption.XmlNode, pskNs, "MediaSizeWidth"));
        pageSizeOptionHeight = getValueFromFirstValueNode(getScoredProperty(pageSizeOption.XmlNode, pskNs, "MediaSizeHeight"));
    }
    catch (err) {
        var xmlDoc = printTicket.xmlNode;
        var rootNode = xmlDoc.documentElement;
        pageSizeOptionWidth = getParameterInit(rootNode, privateNs, "PageMediaSizeMediaSizeWidth");
        pageSizeOptionHeight = getParameterInit(rootNode, privateNs, "PageMediaSizeMediaSizeHeight");
    }

    var fitToOptionWidth = getValueFromFirstValueNode(getScoredProperty(ptPageScalingOption.XmlNode, privateNs, "PaperWidth"));
    var fitToOptionHeight = getValueFromFirstValueNode(getScoredProperty(ptPageScalingOption.XmlNode, privateNs, "PaperHeight"));
    return Math.min(fitToOptionWidth * 1.0 / pageSizeOptionWidth, fitToOptionHeight * 1.0 / pageSizeOptionHeight);
}

function getUserMarginsValue(printTicket, scriptContext) {
    var ptUserMarginsFeature = printTicket.GetFeature("JobUserMargin", privateNs);
    var result = 0;

    if (ptUserMarginsFeature == null) {
        result = userMarginValues[0];
    } else {
        var ptPUserMarginsOption = ptUserMarginsFeature.SelectedOption.Name;
        result = userMarginValues[ptPUserMarginsOption];
    }

    return result;
}

// ***********************************************************************************************************************************************************************
//
// Helper functions to Print Ticket management
//
// ***********************************************************************************************************************************************************************
function getParameterInit(node, keywordNamespace, parameterName) {
    return searchByAttributeName(
        node,
        psfPrefix + ":ParameterInit",
        keywordNamespace,
        parameterName);
}

function getParameterRef(node, keywordNamespace, parameterName) {
    return searchByAttributeName(
        node,
        psfPrefix + ":ParameterRef",
        keywordNamespace,
        parameterName);
}

function getProperty(node, keywordNamespace, propertyName) {
    /// <summary>
    ///     Retrieve a 'Property' element in a print ticket/print capabilities document.
    /// </summary>
    /// <param name="node" type="IXMLDOMNode">
    ///     The scope of the search i.e. the parent node.
    /// </param>
    /// <param name="keywordNamespace" type="String">
    ///     The namespace in which the element's 'name' attribute is defined.
    /// </param>
    /// <param name="propertyName" type="String">
    ///     The Property's 'name' attribute (without the namespace prefix).
    /// </param>
    /// <returns type="IXMLDOMNode" mayBeNull="true">
    ///     The node on success, 'null' on failure.
    /// </returns>
    return searchByAttributeName(
        node,
        psfPrefix + ":Property",
        keywordNamespace,
        propertyName);
}

function getScoredProperty(node, keywordNamespace, propertyName) {
    return searchByAttributeName(
        node,
        psfPrefix + ":ScoredProperty",
        keywordNamespace,
        propertyName);
}

function setNamespace(node, nameSpace, nameSpaceUrl) {
    var optionNode = node.documentElement;

    try {
        optionNode.setAttribute("xmlns:" + nameSpace, nameSpaceUrl);
    } catch (e) {
        // Not failing. Using defaults
    }
}


function addFeatureInTicket(printTicket, featureName, featureNs, opt, values) {
    var xmlDoc = printTicket.XmlNode;
    var rootNode = xmlDoc.documentElement;
    var featureNode = addPsfElementWithNameAttrToNode(rootNode, "psf:Feature", featureName, featureNs);

    addOptionsToFeatureNode(featureNode, opt, values);

    return featureNode;
}

function addParameterDef(printCapabilities, parameterDefs) {
    var xmlDoc = printCapabilities.XmlNode;
    var rootNode = xmlDoc.documentElement;
    for (var i = 0; i < parameterDefs.length; i++) {
        var paramDef = parameterDefs[i];

        var parameterDefNode = addPsfElementWithNameAttrToNode(rootNode, "psf:ParameterDef", paramDef.paramDefName, paramDef.paramDefNs);

        if (paramDef.properties != null) {
            addPropertiesToNode(parameterDefNode, paramDef.properties);
        }
    }
}

function addPropertiesToNode(parameterDefNode, properties) {
    for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        var propertyNode = addPsfElementWithNameAttrToNode(parameterDefNode, "psf:Property", property.propName, property.propNameNs);
        var valueNode = addNodeElementToNode(propertyNode, "psf:Value", psfNs);

        addNodeAttributeToNode(valueNode, "xsi:type", xsiNs, property.valueType);
        valueNode.text = property.value;
    }
}

function addParameterInit(printTicket, parameterInit, value) {
    var xmlDoc = printTicket.XmlNode;
    var rootNode = xmlDoc.documentElement;
    var parameterInitNode = addPsfElementWithNameAttrToNode(rootNode, "psf:ParameterInit", parameterInit.paramInitName, parameterInit.paramInitNs);
    var psfElement = addNodeElementToNode(parameterInitNode, "psf:Value", psfNs);

    addNodeAttributeToNode(psfElement, "xsi:type", xsiNs, parameterInit.valueType);
    psfElement.text = value;
}

function addOptionsToFeatureNode(featureNode, featureOptions, values) {
    for (var i = 0; i < featureOptions.length; i++) {
        var option = featureOptions[i];

        var optionNode = addPsfElementWithNameAttrToNode(featureNode, "psf:Option", option.optionName, option.optionNs);

        if (typeof option.attributeName !== 'undefined' && typeof option.attributeNameNs !== 'undefined' && typeof option.attributeValue !== 'undefined') {
            addNodeAttributeToNode(optionNode, option.attributeName, option.attributeNameNs, option.attributeValue);
        }

        if (null != option.scoredProperties) {
            addScoredPropertiesToOption(optionNode, option.scoredProperties, values);
        }

        if (null != option.properties) {
            addPropertiesToNode(optionNode, option.properties);
        }
    }
}

function addScoredPropertiesToOption(optionNode, optionScoredProperties, values) {
    var xmlDoc = optionNode.ownerDocument;
    var isPrintCapabilities = xmlDoc.documentElement.baseName == "PrintCapabilities";

    for (var i = 0; i < optionScoredProperties.length; i++) {
        var scoredProperty = optionScoredProperties[i];
        var scoredPropertyNode = addPsfElementWithNameAttrToNode(optionNode, "psf:ScoredProperty", scoredProperty.scoredPropertyName, scoredProperty.scoredPropertyNs);
        if (isPrintCapabilities || values == null) {
            if (scoredProperty.paramRefName == null) {
                var valueNode = addNodeElementToNode(scoredPropertyNode, "psf:Value", psfNs);
                valueNode.text = scoredProperty.value;
                addNodeAttributeToNode(valueNode, "xsi:type", xsiNs, scoredProperty.valueType);
            }
            else {
                addPsfElementWithNameAttrToNode(scoredPropertyNode, "psf:ParameterRef", scoredProperty.paramRefName, scoredProperty.paramRefNs);
            }
        } else {
            var valueNode = addNodeElementToNode(scoredPropertyNode, "psf:Value", psfNs);
            valueNode.text = values[i];
        }
    }
}

// ***********************************************************************************************************************************************************************
//
// Helper functions to Properties management
//
// ***********************************************************************************************************************************************************************

function getUserProperty(scriptContext, propertyName) {
    try {
        return scriptContext.UserProperties.GetString(propertyName);
    } catch (e) {
        return null;
    }
}

function getIntUserProperty(scriptContext, propertyName) {
    try {
        return scriptContext.UserProperties.GetInt32(propertyName);
    } catch (e) {
        return null;
    }
}

function getQueueProperty(scriptContext, propertyName) {
    try {
        return scriptContext.QueueProperties.GetString(propertyName);
    } catch (e) {
        return null;
    }
}

function getDevModeProperty(devModeProperties, propertyName) {
    try {
        return devModeProperties.GetString(propertyName);
    } catch (e) {
        return null;
    }
}

function getIntDevModeProperty(devModeProperties, propertyName) {
    try {
        return devModeProperties.GetInt32(propertyName);
    } catch (e) {
        return null;
    }
}

function setDevModeProperty(devModeProperties, propertyName, propertyValue) {
    devModeProperties.SetString(propertyName, propertyValue);
}

function setIntDevModeProperty(devModeProperties, propertyName, propertyValue) {
    devModeProperties.SetInt32(propertyName, propertyValue);
}

// ***********************************************************************************************************************************************************************
//
// Helper functions to Xml treatment
//
// ***********************************************************************************************************************************************************************

function getPropertyFirstValueNode(propertyNode) {
    /// <summary>
    ///     Retrieve the first 'value' node found under a 'Property' or 'ScoredProperty' node.
    /// </summary>
    /// <param name="propertyNode" type="IXMLDOMNode">
    ///     The 'Property'/'ScoredProperty' node.
    /// </param>
    /// <returns type="IXMLDOMNode" mayBeNull="true">
    ///     The 'Value' node on success, 'null' on failure.
    /// </returns>
    if (!propertyNode) {
        return null;
    }

    var nodeName = propertyNode.nodeName;
    if ((nodeName.indexOf(":Property") < 0) &&
        (nodeName.indexOf(":ScoredProperty") < 0)) {
        return null;
    }

    var valueNode = propertyNode.selectSingleNode(psfPrefix + ":Value");
    return valueNode;
}

function getParameterInitFirstValueNode(propertyNode) {
    /// <summary>
    ///     Retrieve the first 'value' node found under a 'Property' or 'ScoredProperty' node.
    /// </summary>
    /// <param name="propertyNode" type="IXMLDOMNode">
    ///     The 'Property'/'ScoredProperty' node.
    /// </param>
    /// <returns type="IXMLDOMNode" mayBeNull="true">
    ///     The 'Value' node on success, 'null' on failure.
    /// </returns>
    if (!propertyNode) {
        return null;
    }

    var nodeName = propertyNode.nodeName;
    if (nodeName.indexOf(":ParameterInit") < 0) {
        return null;
    }

    var valueNode = propertyNode.selectSingleNode(psfPrefix + ":Value");
    return valueNode;
}

function getValueFromFirstValueNode(node) {
    var valueNode = getPropertyFirstValueNode(node);
    return valueNode.firstChild.nodeValue;
}

function getNodeElementName(xmlDoc, name, namespace) {
    return getPrefixForNamespace(xmlDoc, namespace) + ":" + name;
}

function getPrefixForNamespace(node, namespace) {
    /// <summary>
    ///     This function returns the prefix for a given namespace.
    ///     Example: In 'psf:printTicket', 'psf' is the prefix for the namespace.
    ///     xmlns:psf="http://schemas.microsoft.com/windows/2003/08/printing/printschemaframework"
    /// </summary>
    /// <param name="node" type="IXMLDOMNode">
    ///     A node in the XML document.
    /// </param>
    /// <param name="namespace" type="String">
    ///     The namespace for which prefix is returned.
    /// </param>
    /// <returns type="String">
    ///     Returns the namespace corresponding to the prefix.
    /// </returns>

    if (!node) {
        return null;
    }

    // Navigate to the root element of the document.
    var rootNode = node.documentElement;

    // Query to retrieve the list of attribute nodes for the current node
    // that matches the namespace in the 'namespace' variable.
    var xPathQuery = "namespace::node()[.='"
        + namespace
        + "']";
    var namespaceNode = rootNode.selectSingleNode(xPathQuery);
    var prefix = namespaceNode.baseName;

    return prefix;
}

function setSelectionNamespace(xmlNode, prefix, namespace) {
    xmlNode.setProperty("SelectionNamespaces", "xmlns:" + prefix + "='" + namespace + "'");
}

function setSubPropertyValue(parentProperty, keywordNamespace, subPropertyName, value) {
    /// <summary>
    ///     Set the value contained in an inner Property node's 'Value' node (i.e. 'Value' node in a Property node
    ///     contained inside another Property node).
    /// </summary>
    /// <param name="parentProperty" type="IXMLDOMNode">
    ///     The parent property node.
    /// </param>
    /// <param name="keywordNamespace" type="String">
    ///     The namespace in which the property name is defined.
    /// </param>
    /// <param name="subPropertyName" type="String">
    ///     The name of the sub-property node.
    /// </param>
    /// <param name="value" type="variant">
    ///     The value to be set in the sub-property node's 'Value' node.
    /// </param>
    /// <returns type="IXMLDOMNode" mayBeNull="true">
    ///     Refer setPropertyValue.
    /// </returns>
    if (!parentProperty ||
        !keywordNamespace ||
        !subPropertyName) {
        return null;
    }
    var subPropertyNode = getProperty(
        parentProperty,
        keywordNamespace,
        subPropertyName);

    if (subPropertyNode == null) {
        subPropertyNode = getScoredProperty(
            parentProperty,
            keywordNamespace,
            subPropertyName);
    }

    return setPropertyValue(
        subPropertyNode,
        value);
}

function setPropertyValue(propertyNode, value) {
    /// <summary>
    ///     Set the value contained in the 'Value' node under a 'Property'
    ///     or a 'ScoredProperty' node in the print ticket/print capabilities document.
    /// </summary>
    /// <param name="propertyNode" type="IXMLDOMNode">
    ///     The 'Property'/'ScoredProperty' node.
    /// </param>
    /// <param name="value" type="variant">
    ///     The value to be stored under the 'Value' node.
    /// </param>
    /// <returns type="IXMLDOMNode" mayBeNull="true" locid="R:propertyValue">
    ///     First child 'Property' node if found, Null otherwise.
    /// </returns>
    var valueNode = getPropertyFirstValueNode(propertyNode);
    if (valueNode) {
        var child = valueNode.firstChild;
        if (child) {
            child.nodeValue = value;
            return child;
        }
    }
    return null;
}

function getParameterInitValue(propertyNode) {
    /// <summary>
    ///     Set the value contained in the 'Value' node under a 'Property'
    ///     or a 'ScoredProperty' node in the print ticket/print capabilities document.
    /// </summary>
    /// <param name="propertyNode" type="IXMLDOMNode">
    ///     The 'Property'/'ScoredProperty' node.
    /// </param>
    /// <param name="value" type="variant">
    ///     The value to be stored under the 'Value' node.
    /// </param>
    /// <returns type="IXMLDOMNode" mayBeNull="true" locid="R:propertyValue">
    ///     First child 'Property' node if found, Null otherwise.
    /// </returns>
    var valueNode = getParameterInitFirstValueNode(propertyNode);
    if (valueNode) {
        var child = valueNode.firstChild;
        if (child) {
            return child.nodeValue;
        }
    }
    return null;
}

function setParameterInitValue(propertyNode, value) {
    /// <summary>
    ///     Set the value contained in the 'Value' node under a 'Property'
    ///     or a 'ScoredProperty' node in the print ticket/print capabilities document.
    /// </summary>
    /// <param name="propertyNode" type="IXMLDOMNode">
    ///     The 'Property'/'ScoredProperty' node.
    /// </param>
    /// <param name="value" type="variant">
    ///     The value to be stored under the 'Value' node.
    /// </param>
    /// <returns type="IXMLDOMNode" mayBeNull="true" locid="R:propertyValue">
    ///     First child 'Property' node if found, Null otherwise.
    /// </returns>
    var valueNode = getParameterInitFirstValueNode(propertyNode);
    if (valueNode) {
        var child = valueNode.firstChild;
        if (child) {
            if (child.nodeValue != value) {
                child.nodeValue = value;
            }
            return child;
        }
    }
    return null;
}

function addNodeAttributeToNode(elementNode, parameterName, parameterNs, value) {
    var xmlDoc = elementNode.ownerDocument;
    var attrNode = xmlDoc.createNode(NODE_ATTRIBUTE, parameterName, parameterNs);
    attrNode.text = value;
    elementNode.setAttributeNode(attrNode);
    return attrNode;
}

function addNodeElementToNode(elementNode, name, namespace) {
    var xmlDoc = elementNode.ownerDocument;
    var newNode = xmlDoc.createNode(NODE_ELEMENT, name, namespace);
    elementNode.appendChild(newNode);
    return newNode;
}

function addPsfElementWithNameAttrToNode(elementNode, elementName, nameValue, nameValueNs) {
    var psfElement = addNodeElementToNode(elementNode, elementName, psfNs);

    if (nameValue != null) {
        addNodeAttributeToNode(psfElement, "name", "", getNodeElementName(elementNode.ownerDocument, nameValue, nameValueNs));
    }

    return psfElement;
}

function searchByAttributeName(node, tagName, keywordNamespace, nameAttribute) {
    /// <summary>
    ///      Search for a node that with a specific tag name and containing a
    ///      specific 'name' attribute
    ///      e.g. &lt;Bar name=\"ns:Foo\"&gt; is a valid result for the following search:
    ///           Retrieve elements with tagName='Bar' whose nameAttribute='Foo' in
    ///           the namespace corresponding to prefix 'ns'.
    /// </summary>
    /// <param name="node" type="IXMLDOMNode">
    ///     Scope of the search i.e. the parent node.
    /// </param>
    /// <param name="tagName" type="String">
    ///     Restrict the searches to elements with this tag name.
    /// </param>
    /// <param name="keywordNamespace" type="String">
    ///     The namespace in which the element's name is defined.
    /// </param> 
    /// <param name="nameAttribute" type="String">
    ///     The 'name' attribute to search for.
    /// </param>
    /// <returns type="IXMLDOMNode" mayBeNull="true">
    ///     IXMLDOMNode on success, 'null' on failure.
    /// </returns>
    if (!node ||
        !tagName ||
        !keywordNamespace ||
        !nameAttribute) {
        return null;
    }

    // Please refer to:
    // http://blogs.msdn.com/b/benkuhn/archive/2006/05/04/printticket-names-and-xpath.aspx
    // for more information on this XPath query.
    var xPathQuery = "descendant::"
        + tagName
        + "[substring-after(@name,':')='"
        + nameAttribute
        + "']"
        + "[name(namespace::*[.='"
        + keywordNamespace
        + "'])=substring-before(@name,':')]"
        ;

    return node.selectSingleNode(xPathQuery);
}

function objectToString(object) {
    var str = '{';
    var prevObj = null;
    for (var p in object) {
        if (prevObj != null) {
            str += "\"" + prevObj + "\":\"" + object[prevObj] + '\",';
        }
        prevObj = p;
    }

    str += "\"" + prevObj + "\":\"" + object[prevObj] + "\"";
    str += '}';
    return str;
}

var PrintSchemaConstrainedSetting = {
    PrintSchemaConstrainedSetting_None: 0,
    PrintSchemaConstrainedSetting_PrintTicket: 1,
    PrintSchemaConstrainedSetting_Admin: 2,
    PrintSchemaConstrainedSetting_Device: 3
};

var STREAM_SEEK = {
    STREAM_SEEK_SET: 0,
    STREAM_SEEK_CUR: 1,
    STREAM_SEEK_END: 2
};

var PrintSchemaSelectionType = {
    PrintSchemaSelectionType_PickOne: 0,
    PrintSchemaSelectionType_PickMany: 1
};