const $20b4a97a61b3fccb$var$classname = "sv100-premium-block";
function $20b4a97a61b3fccb$export$6b08fcebd8248e15(props) {
    let output = $20b4a97a61b3fccb$var$classname;
    const _namespace = props.name.split("/");
    if (Array.isArray(_namespace)) output += "-" + _namespace[0];
    return output + "-" + props.attributes.blockId;
}
function $20b4a97a61b3fccb$export$370294d6416a8a11() {}
function $20b4a97a61b3fccb$export$44487a86467333c3() {
    return js_sv100_premium_gutenberg_extended_block_controls_scripts_controls.config;
}
function $20b4a97a61b3fccb$export$48c17662a6902497(blockName, settingName = "") {
    let output = false;
    const blockList = $20b4a97a61b3fccb$export$44487a86467333c3().blocks;
    if (typeof blockList[blockName] !== "undefined" && typeof blockList[blockName].support !== "undefined" && settingName !== "") {
        const supportList = blockList[blockName].support;
        if (supportList.includes("*") || supportList.includes(settingName)) output = true;
         // allow excluding block names with wildcards in place
        if (supportList.includes("-" + settingName)) output = false;
    } // test without setting name
    if (typeof blockList[blockName] !== "undefined" && settingName === "") output = true;
    return output;
}
function $20b4a97a61b3fccb$export$aea206c5be40c027(props) {
    let id = btoa(props.clientId).replace(/[^a-z0-9]/gi, "");
    return id.substr(id.length - 12, 12);
}
function $20b4a97a61b3fccb$export$ccc9fe24e363c71e(props) {
    let output = false;
    const _document = $20b4a97a61b3fccb$export$181eafda0ca2b0bb(props);
    const elements = _document.querySelectorAll(".sv100-premium-block-core-" + props.attributes.blockId);
    if (elements.length > 1) output = true;
    return output;
}
function $20b4a97a61b3fccb$export$9a00dee1beb8f576(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
}
function $20b4a97a61b3fccb$export$5b1f80f3c282648c(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toLowerCase() + s.slice(1);
}
function $20b4a97a61b3fccb$export$a7272da64dd3b70a(name, attr) {
    const { blocks: blocks  } = wp; // exceptions / edge cases -------------------------------------------------------
    if (name.includes("paragraph")) return "p";
    if (name.includes("heading")) {
        if (typeof attr !== "undefined" && typeof attr.level !== "undefined") return "h" + attr.level;
        return "";
    }
    if (name.includes("list")) {
        if (typeof attr !== "undefined" && typeof attr.ordered !== "undefined" && attr.ordered === true) return "ol";
        return "ul";
    } // exceptions / edge cases -------------------------------------------------------
    return "." + blocks.getBlockDefaultClassName(name);
}
function $20b4a97a61b3fccb$export$332ae97edce30424(cssValue, defaultUnit = "") {
    // check for empty values
    if (cssValue === "" || cssValue === null || cssValue === 0 || typeof cssValue === "undefined") return cssValue;
     // integer values to string
    cssValue = cssValue.toString(); // check for auto
    if (cssValue.includes("auto")) return cssValue;
     // cssValue already has a unit
    if (/px|%|em|rem|vh|vw/.test(cssValue)) return cssValue;
     // default fallback
    return cssValue + defaultUnit;
} // CSS GENERATION ------------------------------------------------------------------------------------------------------
function $20b4a97a61b3fccb$export$cd46662790a9feff(selectors, blockId, isResponsive = false, screen = "", breakpoint_calc = "from", reverseSelector = false) {
    let gen_css = "";
    let res_css = "";
    /* replace this later with backend user settings */ const breakpoints = {
        mobile: {
            value: 0,
            before: "none",
            after: "tablet"
        },
        mobileLandscape: {
            value: 0,
            before: "none",
            after: "tabletLandscape"
        },
        tablet: {
            value: 768,
            before: "mobile",
            after: "tabletPro"
        },
        tabletLandscape: {
            value: 992,
            before: "mobileLandscape",
            after: "tabletProLandscape"
        },
        tabletPro: {
            value: 1024,
            before: "tablet",
            after: "desktop"
        },
        tabletProLandscape: {
            value: 1366,
            before: "tabletLandscape",
            after: "desktop"
        },
        desktop: {
            value: 1600,
            before: "tabletProLandscape",
            after: "none"
        }
    };
    if (typeof breakpoints[screen] === "undefined") screen = "mobile"; // fallback
    /* --------------------------------------------- */ for(let i in selectors){
        let sel = selectors[i];
        let css = "";
        for(let j in sel){
            let checkString = true;
            if (typeof sel[j] === "string" && sel[j].length === 0) checkString = false;
            if (typeof sel[j] !== "undefined" && sel[j].replaceAll(/\s/g, "") !== "" && sel[j].replaceAll(/\s/g, "") !== "!important" && sel[j].replaceAll(/\s/g, "") !== "undefined" && sel[j].replaceAll(/\s/g, "") !== "undefined!important" && checkString) css += j + ": " + sel[j] + ";";
        }
        if (css !== "") {
            if (reverseSelector === true) gen_css += blockId + i;
            else gen_css += i + blockId;
            gen_css += "{";
            gen_css += css;
            gen_css += "}";
        }
    }
    if (isResponsive && typeof gen_css !== "undefined" && gen_css !== "") {
        let media = ""; //sv style
        if (breakpoint_calc === "from") media = "@media(min-width: " + breakpoints[screen].value + "px)";
         //reversed
        if (breakpoint_calc === "till") media = "@media(max-width: " + breakpoints[screen].value + "px)";
         //between
        if (breakpoint_calc === "between") {
            media = "@media(min-width: " + breakpoints[screen].value + "px)"; // look around after
            if (breakpoints[screen].after !== "none" && typeof breakpoints[breakpoints[screen].after] !== "undefined") {
                // exception for mobile 0,0
                if (breakpoints[screen].value === breakpoints[breakpoints[screen].after].value) {
                    const _after = breakpoints[breakpoints[screen].after];
                    if (_after.after !== "none" && typeof breakpoints[_after.after] !== "undefined") {
                        media += " and ";
                        media += "(max-width: " + (breakpoints[_after.after].value - 1) + "px)";
                    }
                } else {
                    media += " and ";
                    media += "(max-width: " + (breakpoints[breakpoints[screen].after].value - 1) + "px)";
                }
            }
        }
        let orientation = "";
        if (screen !== "mobile" && screen !== "desktop") {
            if (screen.includes("Landscape")) orientation = " and (orientation: landscape)";
            else orientation = " and (orientation: portrait)";
        }
        res_css += media + orientation + " {";
        res_css += gen_css;
        res_css += "}";
    }
    return isResponsive === true ? res_css : gen_css;
}
function $20b4a97a61b3fccb$export$181eafda0ca2b0bb(props) {
    const iframes = document.querySelectorAll(".edit-site-visual-editor__editor-canvas");
    let _document = document; // check for block editor iframes
    for(let i = 0; i < iframes.length; i++){
        let block = iframes[i].contentDocument.getElementById("block-" + props.clientId);
        if (block !== null) {
            _document = iframes[i].contentDocument;
            break;
        }
    }
    return _document;
} // CSS INJECTION -------------------------------------------------------------------------------------------------------
function $20b4a97a61b3fccb$export$ce14e686d8283ef(props) {
    const _document = $20b4a97a61b3fccb$export$181eafda0ca2b0bb(props);
    const css = props.attributes.parsedCSSString;
    const ID = "sv100-premium-gutenberg-extended-block-controls-" + props.attributes.blockId;
    let block = _document.getElementById("block-" + props.clientId);
    let el = _document.getElementById(ID); // <style> html element
    if (block !== null) {
        if (el === null) {
            el = _document.createElement("style");
            el.setAttribute("id", ID);
            el.innerHTML = css;
            _document.head.appendChild(el);
        } else el.innerHTML = css;
    }
}
function $20b4a97a61b3fccb$export$4d99a2890bb989f0(val, props, _name, _prefix, EditorStyles, appendix = "") {
    // clone attributes
    const attr = Object.assign({}, props.attributes); // assign new value
    // we have to keep the object as string due the fact that gutenberg / react doesn't detect changes in arrays correctly
    attr.parsedCSS = JSON.parse(attr.parsedCSS);
    attr[_prefix + attr.currentResponsiveTab + appendix] = val; // parse settings specific css
    attr.parsedCSS[_name] = EditorStyles(attr, props.name); //collapse css objects
    let css = "";
    Object.keys(attr.parsedCSS).map(function(key, index) {
        if (attr[$20b4a97a61b3fccb$export$5b1f80f3c282648c(key) + "Active"] === true) css += attr.parsedCSS[key];
    }); // update properties for rerender and injection
    props.setAttributes({
        [_prefix + attr.currentResponsiveTab + appendix]: attr[_prefix + attr.currentResponsiveTab + appendix],
        parsedCSS: JSON.stringify(attr.parsedCSS),
        parsedCSSString: css // this gets injected
    });
}
function $20b4a97a61b3fccb$export$fb486fe33c676ab0(values, props, _name, _prefix, EditorStyles, appendix = "") {
    // clone attributes
    const attr = Object.assign({}, props.attributes); // assign new value
    // we have to keep the object as string due the fact that gutenberg / react doesn't detect changes in arrays correctly
    attr.parsedCSS = JSON.parse(attr.parsedCSS);
    attr[_prefix + "Top" + attr.currentResponsiveTab + appendix] = typeof values["top"] === "undefined" ? "" : values["top"];
    attr[_prefix + "Right" + attr.currentResponsiveTab + appendix] = typeof values["right"] === "undefined" ? "" : values["right"];
    attr[_prefix + "Bottom" + attr.currentResponsiveTab + appendix] = typeof values["bottom"] === "undefined" ? "" : values["bottom"];
    attr[_prefix + "Left" + attr.currentResponsiveTab + appendix] = typeof values["left"] === "undefined" ? "" : values["left"]; // parse settings specific css
    attr.parsedCSS[_name] = EditorStyles(attr, props.name); //collapse css objects
    let css = "";
    Object.keys(attr.parsedCSS).map(function(key, index) {
        if (attr[$20b4a97a61b3fccb$export$5b1f80f3c282648c(key) + "Active"] === true) css += attr.parsedCSS[key];
    }); // update properties for rerender and injection
    props.setAttributes({
        [_prefix + "Top" + attr.currentResponsiveTab + appendix]: attr[_prefix + "Top" + attr.currentResponsiveTab + appendix],
        [_prefix + "Right" + attr.currentResponsiveTab + appendix]: attr[_prefix + "Right" + attr.currentResponsiveTab + appendix],
        [_prefix + "Bottom" + attr.currentResponsiveTab + appendix]: attr[_prefix + "Bottom" + attr.currentResponsiveTab + appendix],
        [_prefix + "Left" + attr.currentResponsiveTab + appendix]: attr[_prefix + "Left" + attr.currentResponsiveTab + appendix],
        parsedCSS: JSON.stringify(attr.parsedCSS),
        parsedCSSString: css // this gets injected
    });
}
function $20b4a97a61b3fccb$export$104514599496d2f5(values, props, _name, _prefix, EditorStyles, appendix = "") {
    // clone attributes
    const attr = Object.assign({}, props.attributes); // assign new value
    // we have to keep the object as string due the fact that gutenberg / react doesn't detect changes in arrays correctly
    attr.parsedCSS = JSON.parse(attr.parsedCSS);
    attr[_prefix + "TopLeft" + attr.currentResponsiveTab + appendix] = typeof values["top"] === "undefined" ? "" : values["top"];
    attr[_prefix + "TopRight" + attr.currentResponsiveTab + appendix] = typeof values["right"] === "undefined" ? "" : values["right"];
    attr[_prefix + "BottomLeft" + attr.currentResponsiveTab + appendix] = typeof values["bottom"] === "undefined" ? "" : values["bottom"];
    attr[_prefix + "BottomRight" + attr.currentResponsiveTab + appendix] = typeof values["left"] === "undefined" ? "" : values["left"]; // parse settings specific css
    attr.parsedCSS[_name] = EditorStyles(attr, props.name); //collapse css objects
    let css = "";
    Object.keys(attr.parsedCSS).map(function(key, index) {
        if (attr[$20b4a97a61b3fccb$export$5b1f80f3c282648c(key) + "Active"] === true) css += attr.parsedCSS[key];
    }); // update properties for rerender and injection
    props.setAttributes({
        [_prefix + "TopLeft" + attr.currentResponsiveTab + appendix]: attr[_prefix + "TopLeft" + attr.currentResponsiveTab + appendix],
        [_prefix + "TopRight" + attr.currentResponsiveTab + appendix]: attr[_prefix + "TopRight" + attr.currentResponsiveTab + appendix],
        [_prefix + "BottomLeft" + attr.currentResponsiveTab + appendix]: attr[_prefix + "BottomLeft" + attr.currentResponsiveTab + appendix],
        [_prefix + "BottomRight" + attr.currentResponsiveTab + appendix]: attr[_prefix + "BottomRight" + attr.currentResponsiveTab + appendix],
        parsedCSS: JSON.stringify(attr.parsedCSS),
        parsedCSSString: css // this gets injected
    });
}
function $20b4a97a61b3fccb$export$c3e180dc9f00bf2a(val, props, _name, _prefix, EditorStyles) {
    // clone attributes
    const attr = Object.assign({}, props.attributes); // assign new value
    attr[_prefix + attr.currentResponsiveTab] = val; //attr[_prefix+attr.currentResponsiveTab].unit = unit;
    // parse settings specific css
    attr.parsedCSS[_name] = EditorStyles(attr, props.name); //collapse css objects
    let css = "";
    Object.keys(attr.parsedCSS).map(function(key, index) {
        if (attr[$20b4a97a61b3fccb$export$5b1f80f3c282648c(key) + "Active"] === true) css += attr.parsedCSS[key];
    }); // update properties for rerender and injection
    props.setAttributes({
        [_prefix + attr.currentResponsiveTab]: attr[_prefix + attr.currentResponsiveTab],
        parsedCSS: props.parsedCSS.concat(attr.parsedCSS),
        parsedCSSString: css // this gets injected
    });
}
function $20b4a97a61b3fccb$export$cc41408c6320a301(props, _attr = {}) {
    // clone attributes
    const attr = Object.assign(props.attributes, _attr); // assign new value
    // we have to keep the object as string due the fact that gutenberg / react doesn't detect changes in arrays correctly
    attr.parsedCSS = JSON.parse(attr.parsedCSS); //collapse css objects
    let css = "";
    Object.keys(attr.parsedCSS).map(function(key, index) {
        if (attr[$20b4a97a61b3fccb$export$5b1f80f3c282648c(key) + "Active"] === true) css += attr.parsedCSS[key];
    }); // update properties for rerender and injection, merge with other custom attributes
    props.setAttributes(Object.assign(_attr, {
        parsedCSS: JSON.stringify(attr.parsedCSS),
        parsedCSSString: css // this gets injected
    }));
}
function $20b4a97a61b3fccb$export$18b25f20b033ac8e(val1, val2, val3 = "", val4 = "", val5 = "") {
    let output = "undefined"; // check if vals are available (indicates that the value was set)
    if (typeof val1 === "undefined" || typeof val2 === "undefined" || val1 === "" || val2 === "") ;
    else {
        output = val1.toString();
        output += " " + val2.toString();
        if (val3 !== "") output += " " + val3.toString();
        if (val4 !== "") output += " " + val4.toString();
        if (val5 !== "") output += " " + val5.toString();
    }
    return output;
} // handle settings opt-in/out
function $20b4a97a61b3fccb$export$4a65a988b6cd1e7e(props, attr_customs = {}) {
    $20b4a97a61b3fccb$export$cc41408c6320a301(props, attr_customs);
}
function $20b4a97a61b3fccb$export$7c7d338baab9289b(props, attr_customs = {}) {
    $20b4a97a61b3fccb$export$cc41408c6320a301(props, attr_customs);
} // handle classNames
function $20b4a97a61b3fccb$export$378a7f138e43d140(props, list = []) {
    const _list = typeof props.attributes._classNamesList !== "undefined" ? props.attributes._classNamesList : [];
    return [
        ...new Set([
            ..._list,
            ...list
        ])
    ];
}
function $20b4a97a61b3fccb$export$b15ba63803cbc3a1(props, list = []) {
    const _list = typeof props.attributes._classNamesList !== "undefined" ? props.attributes._classNamesList : [];
    for(let i = 0; i < list.length; i++){
        const pos = _list.indexOf(list[i]);
        if (pos >= 0) _list.splice(pos, 1);
    }
    return [
        ...new Set([
            ..._list
        ])
    ];
}


function $40c80b257273d5cd$var$EditorStyles(attr) {
    const wpBlockSelector = ".sv100-premium-block-core-mod-flex.wp-block-columns";
    const { gapDesktop: gapDesktop , gapMobile: gapMobile , gapMobileLandscape: gapMobileLandscape , gapTablet: gapTablet , gapTabletLandscape: gapTabletLandscape , gapTabletPro: gapTabletPro , gapTabletProLandscape: gapTabletProLandscape  } = attr; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "--gap": gapMobile !== "" ? gapMobile + "px" : 0,
            "gap": "var(--gap)"
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "--gap": gapMobileLandscape !== "" ? gapMobileLandscape + "px" : 0,
            "gap": "var(--gap)"
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "--gap": gapTablet !== "" ? gapTablet + "px" : 0,
            "gap": "var(--gap)"
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "--gap": gapTabletLandscape !== "" ? gapTabletLandscape + "px" : 0,
            "gap": "var(--gap)"
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "--gap": gapTabletPro !== "" ? gapTabletPro + "px" : 0,
            "gap": "var(--gap)"
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "--gap": gapTabletProLandscape !== "" ? gapTabletProLandscape + "px" : 0,
            "gap": "var(--gap)"
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "--gap": gapDesktop !== "" ? gapDesktop + "px" : 0,
            "gap": "var(--gap)"
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $40c80b257273d5cd$export$2e2bcd8739ae039 = $40c80b257273d5cd$var$EditorStyles;



const { Fragment: $7b93dac3912d9f2f$var$Fragment  } = wp.element;
const { RangeControl: $7b93dac3912d9f2f$var$RangeControl  } = wp.components;
const { addFilter: $7b93dac3912d9f2f$var$addFilter  } = wp.hooks;
const { __: $7b93dac3912d9f2f$var$__  } = wp.i18n;
const $7b93dac3912d9f2f$var$_name = "GapFlex";
const $7b93dac3912d9f2f$var$_prefix = "gap"; // register attributes
const $7b93dac3912d9f2f$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $7b93dac3912d9f2f$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        gapMobile: {
            type: "integer",
            default: 10
        },
        gapMobileLandscape: {
            type: "integer",
            default: 10
        },
        gapTablet: {
            type: "integer",
            default: 10
        },
        gapTabletLandscape: {
            type: "integer",
            default: 10
        },
        gapTabletPro: {
            type: "integer",
            default: 10
        },
        gapTabletProLandscape: {
            type: "integer",
            default: 10
        },
        gapDesktop: {
            type: "integer",
            default: 10
        }
    });
    return settings;
};
$7b93dac3912d9f2f$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $7b93dac3912d9f2f$var$addCustomControlAttributes); // the component
function $7b93dac3912d9f2f$var$GapFlex(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $7b93dac3912d9f2f$var$_name)) return /*#__PURE__*/ React.createElement($7b93dac3912d9f2f$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    return /*#__PURE__*/ React.createElement($7b93dac3912d9f2f$var$Fragment, null, /*#__PURE__*/ React.createElement($7b93dac3912d9f2f$var$RangeControl, {
        label: $7b93dac3912d9f2f$var$__("Gap", "sv100_premium"),
        value: values[$7b93dac3912d9f2f$var$_prefix + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $7b93dac3912d9f2f$var$_name, $7b93dac3912d9f2f$var$_prefix, (0, $40c80b257273d5cd$export$2e2bcd8739ae039)),
        min: 0,
        max: 500
    }));
}
var $7b93dac3912d9f2f$export$2e2bcd8739ae039 = $7b93dac3912d9f2f$var$GapFlex;



function $c855a9a458ffcf3e$var$EditorStyles(attr, name) {
    const wpBlockSelector = ".sv100-premium-block-core-mod-flex.wp-block-columns";
    const { stackDesktop: stackDesktop , stackMobile: stackMobile , stackMobileLandscape: stackMobileLandscape , stackTablet: stackTablet , stackTabletLandscape: stackTabletLandscape , stackTabletPro: stackTabletPro , stackTabletProLandscape: stackTabletProLandscape , stackReverseDesktop: stackReverseDesktop , stackReverseMobile: stackReverseMobile , stackReverseMobileLandscape: stackReverseMobileLandscape , stackReverseTablet: stackReverseTablet , stackReverseTabletLandscape: stackReverseTabletLandscape , stackReverseTabletPro: stackReverseTabletPro , stackReverseTabletProLandscape: stackReverseTabletProLandscape  } = attr;
    const appendix = " !important";
    let reverse = ""; // selectors
    reverse = stackReverseMobile === true ? "-reverse" : "";
    const mobile = {
        [wpBlockSelector]: {
            "flex-direction": stackMobile !== "" ? stackMobile === true ? "column" + reverse + appendix : "row" + reverse + appendix : 0
        },
        [wpBlockSelector + " > .wp-block-column"]: {
            "flex-basis": stackMobile === true ? "auto" + appendix : "",
            // force flex-basis to prevent height change
            "width": stackMobile === true ? "100%" : "" // force flex-basis to prevent height change
        }
    };
    reverse = stackReverseMobileLandscape === true ? "-reverse" : "";
    const mobileLandscape = {
        [wpBlockSelector]: {
            "flex-direction": stackMobileLandscape !== "" ? stackMobileLandscape === true ? "column" + reverse + appendix : "row" + reverse + appendix : 0
        },
        [wpBlockSelector + " > .wp-block-column"]: {
            "flex-basis": stackMobileLandscape === true ? "auto" + appendix : "",
            // force flex-basis to prevent height change
            "width": stackMobileLandscape === true ? "100%" : ""
        }
    };
    reverse = stackReverseTablet === true ? "-reverse" : "";
    const tablet = {
        [wpBlockSelector]: {
            "flex-direction": stackTablet !== "" ? stackTablet === true ? "column" + reverse + appendix : "row" + reverse + appendix : 0
        },
        [wpBlockSelector + " > .wp-block-column"]: {
            "flex-basis": stackTablet === true ? "auto" + appendix : "",
            // force margin - regardless of theme or gutenberg defaults
            "width": stackTablet === true ? "100%" : ""
        }
    };
    reverse = stackReverseTabletLandscape === true ? "-reverse" : "";
    const tabletLandscape = {
        [wpBlockSelector]: {
            "flex-direction": stackTabletLandscape !== "" ? stackTabletLandscape === true ? "column" + reverse + appendix : "row" + reverse + appendix : 0
        },
        [wpBlockSelector + " > .wp-block-column"]: {
            "flex-basis": stackTabletLandscape === true ? "auto" + appendix : "",
            // force margin - regardless of theme or gutenberg defaults
            "width": stackTabletLandscape === true ? "100%" : ""
        }
    };
    reverse = stackReverseTabletPro === true ? "-reverse" : "";
    const tabletPro = {
        [wpBlockSelector]: {
            "flex-direction": stackTabletPro !== "" ? stackTabletPro === true ? "column" + reverse + appendix : "row" + reverse + appendix : 0
        },
        [wpBlockSelector + " > .wp-block-column"]: {
            "flex-basis": stackTabletPro === true ? "auto" + appendix : "",
            // force margin - regardless of theme or gutenberg defaults
            "width": stackTabletPro === true ? "100%" : ""
        }
    };
    reverse = stackReverseTabletProLandscape === true ? "-reverse" : "";
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "flex-direction": stackTabletProLandscape !== "" ? stackTabletProLandscape === true ? "column" + reverse + appendix : "row" + reverse + appendix : 0
        },
        [wpBlockSelector + " > .wp-block-column"]: {
            "flex-basis": stackTabletProLandscape === true ? "auto" + appendix : "",
            // force margin - regardless of theme or gutenberg defaults
            "width": stackTabletProLandscape === true ? "100%" : ""
        }
    };
    reverse = stackReverseDesktop === true ? "-reverse" : "";
    const desktop = {
        [wpBlockSelector]: {
            "flex-direction": stackDesktop !== "" ? stackDesktop === true ? "column" + reverse + appendix : "row" + reverse + appendix : 0
        },
        [wpBlockSelector + " > .wp-block-column"]: {
            "flex-basis": stackDesktop === true ? "auto" + appendix : "",
            // force margin - regardless of theme or gutenberg defaults
            "width": stackDesktop === true ? "100%" : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile", "between", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape", "between", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet", "between", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape", "between", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro", "between", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape", "between", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop", "between", true);
    return css;
}
var $c855a9a458ffcf3e$export$2e2bcd8739ae039 = $c855a9a458ffcf3e$var$EditorStyles;



const { Fragment: $47170f8e9f9bcd6f$var$Fragment  } = wp.element;
const { ToggleControl: $47170f8e9f9bcd6f$var$ToggleControl  } = wp.components;
const { addFilter: $47170f8e9f9bcd6f$var$addFilter  } = wp.hooks;
const { __: $47170f8e9f9bcd6f$var$__  } = wp.i18n;
const $47170f8e9f9bcd6f$var$_name = "StackFlex";
const $47170f8e9f9bcd6f$var$_prefix = "stack"; // register attributes
const $47170f8e9f9bcd6f$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $47170f8e9f9bcd6f$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        stackMobile: {
            type: "boolean",
            default: true
        },
        stackMobileLandscape: {
            type: "boolean",
            default: false
        },
        stackTablet: {
            type: "boolean",
            default: false
        },
        stackTabletLandscape: {
            type: "boolean",
            default: false
        },
        stackTabletPro: {
            type: "boolean",
            default: false
        },
        stackTabletProLandscape: {
            type: "boolean",
            default: false
        },
        stackDesktop: {
            type: "boolean",
            default: false
        },
        stackReverseMobile: {
            type: "boolean",
            default: false
        },
        stackReverseMobileLandscape: {
            type: "boolean",
            default: false
        },
        stackReverseTablet: {
            type: "boolean",
            default: false
        },
        stackReverseTabletLandscape: {
            type: "boolean",
            default: false
        },
        stackReverseTabletPro: {
            type: "boolean",
            default: false
        },
        stackReverseTabletProLandscape: {
            type: "boolean",
            default: false
        },
        stackReverseDesktop: {
            type: "boolean",
            default: false
        }
    });
    return settings;
};
$47170f8e9f9bcd6f$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $47170f8e9f9bcd6f$var$addCustomControlAttributes); // the component
function $47170f8e9f9bcd6f$var$StackFlex(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $47170f8e9f9bcd6f$var$_name)) return /*#__PURE__*/ React.createElement($47170f8e9f9bcd6f$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    return /*#__PURE__*/ React.createElement($47170f8e9f9bcd6f$var$Fragment, null, /*#__PURE__*/ React.createElement($47170f8e9f9bcd6f$var$ToggleControl, {
        label: $47170f8e9f9bcd6f$var$__("Stack Columns", "sv100_premium"),
        value: values[$47170f8e9f9bcd6f$var$_prefix + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $47170f8e9f9bcd6f$var$_name, $47170f8e9f9bcd6f$var$_prefix, (0, $c855a9a458ffcf3e$export$2e2bcd8739ae039)),
        checked: props.attributes[$47170f8e9f9bcd6f$var$_prefix + currentResponsiveTab]
    }), /*#__PURE__*/ React.createElement($47170f8e9f9bcd6f$var$ToggleControl, {
        label: $47170f8e9f9bcd6f$var$__("Reverse Order", "sv100_premium"),
        value: values[$47170f8e9f9bcd6f$var$_prefix + "Reverse" + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $47170f8e9f9bcd6f$var$_name, $47170f8e9f9bcd6f$var$_prefix + "Reverse", (0, $c855a9a458ffcf3e$export$2e2bcd8739ae039)),
        checked: props.attributes[$47170f8e9f9bcd6f$var$_prefix + "Reverse" + currentResponsiveTab]
    }));
}
var $47170f8e9f9bcd6f$export$2e2bcd8739ae039 = $47170f8e9f9bcd6f$var$StackFlex;



function $52d5034c159d4156$var$EditorStyles(attr) {
    const wpBlockSelector = ".sv100-premium-block-core-mod-flex.wp-block-columns";
    const { wrapFlexMobile: wrapFlexMobile , wrapFlexMobileLandscape: wrapFlexMobileLandscape , wrapFlexTablet: wrapFlexTablet , wrapFlexTabletLandscape: wrapFlexTabletLandscape , wrapFlexTabletPro: wrapFlexTabletPro , wrapFlexTabletProLandscape: wrapFlexTabletProLandscape , wrapFlexDesktop: wrapFlexDesktop  } = attr;
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "flex-wrap": wrapFlexMobile + appendix
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "flex-wrap": wrapFlexMobileLandscape + appendix
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "flex-wrap": wrapFlexTablet + appendix
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "flex-wrap": wrapFlexTabletLandscape + appendix
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "flex-wrap": wrapFlexTabletPro + appendix
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "flex-wrap": wrapFlexTabletProLandscape + appendix
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "flex-wrap": wrapFlexDesktop + appendix
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile", "from");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $52d5034c159d4156$export$2e2bcd8739ae039 = $52d5034c159d4156$var$EditorStyles;



const { Fragment: $32d1cadc161b80c5$var$Fragment  } = wp.element;
const { SelectControl: $32d1cadc161b80c5$var$SelectControl  } = wp.components;
const { addFilter: $32d1cadc161b80c5$var$addFilter  } = wp.hooks;
const { __: $32d1cadc161b80c5$var$__  } = wp.i18n;
const $32d1cadc161b80c5$var$_name = "WrapFlex";
const $32d1cadc161b80c5$var$_prefix = "wrapFlex"; // register attributes
const $32d1cadc161b80c5$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $32d1cadc161b80c5$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        wrapFlexActive: {
            type: "boolean",
            default: false
        },
        wrapFlexMobile: {
            type: "string",
            default: ""
        },
        wrapFlexMobileLandscape: {
            type: "string",
            default: ""
        },
        wrapFlexTablet: {
            type: "string",
            default: ""
        },
        wrapFlexTabletLandscape: {
            type: "string",
            default: ""
        },
        wrapFlexTabletPro: {
            type: "string",
            default: ""
        },
        wrapFlexTabletProLandscape: {
            type: "string",
            default: ""
        },
        wrapFlexDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$32d1cadc161b80c5$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $32d1cadc161b80c5$var$addCustomControlAttributes); // the component
function $32d1cadc161b80c5$var$WrapFlex(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $32d1cadc161b80c5$var$_name)) return /*#__PURE__*/ React.createElement($32d1cadc161b80c5$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    return /*#__PURE__*/ React.createElement($32d1cadc161b80c5$var$Fragment, null, /*#__PURE__*/ React.createElement($32d1cadc161b80c5$var$SelectControl, {
        label: $32d1cadc161b80c5$var$__("Wrap Columns", "sv100_premium"),
        value: values[$32d1cadc161b80c5$var$_prefix + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $32d1cadc161b80c5$var$_name, $32d1cadc161b80c5$var$_prefix, (0, $52d5034c159d4156$export$2e2bcd8739ae039));
        },
        options: [
            {
                value: "",
                label: "Select"
            },
            {
                value: "nowrap",
                label: "nowrap"
            },
            {
                value: "wrap",
                label: "wrap"
            },
            {
                value: "wrap-reverse",
                label: "wrap-reverse"
            }
        ]
    }));
}
var $32d1cadc161b80c5$export$2e2bcd8739ae039 = $32d1cadc161b80c5$var$WrapFlex;



function $96b3d85aa11ece36$var$EditorStyles(attr) {
    const wpBlockSelector = ".sv100-premium-block-core-mod-flex.wp-block-columns";
    const wpBlockChildSelector = ".sv100-premium-block-core-mod-flex.wp-block-columns > .wp-block-column";
    const { justifyDesktop: justifyDesktop , justifyMobile: justifyMobile , justifyMobileLandscape: justifyMobileLandscape , justifyTablet: justifyTablet , justifyTabletLandscape: justifyTabletLandscape , justifyTabletPro: justifyTabletPro , justifyTabletProLandscape: justifyTabletProLandscape  } = attr; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "justify-content": justifyMobile
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "justify-content": justifyMobileLandscape
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "justify-content": justifyTablet
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "justify-content": justifyTabletLandscape
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "justify-content": justifyTabletPro
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "justify-content": justifyTabletProLandscape
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "justify-content": justifyDesktop
        }
    }; // children // experimental
    const children = {
        [wpBlockChildSelector]: {
            "flex-grow": "0",
            "flex-basis": "auto"
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile", "from");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    if (css !== "") css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(children, blockId, true, "mobile", "from", true);
    return css;
}
var $96b3d85aa11ece36$export$2e2bcd8739ae039 = $96b3d85aa11ece36$var$EditorStyles;



const { Fragment: $fc4f22f8a866e147$var$Fragment  } = wp.element;
const { SelectControl: $fc4f22f8a866e147$var$SelectControl  } = wp.components;
const { addFilter: $fc4f22f8a866e147$var$addFilter  } = wp.hooks;
const { __: $fc4f22f8a866e147$var$__  } = wp.i18n;
const $fc4f22f8a866e147$var$_name = "JustifyFlex";
const $fc4f22f8a866e147$var$_prefix = "justify"; // register attributes
const $fc4f22f8a866e147$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $fc4f22f8a866e147$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        justifyActive: {
            type: "boolean",
            default: false
        },
        justifyMobile: {
            type: "string",
            default: ""
        },
        justifyMobileLandscape: {
            type: "string",
            default: ""
        },
        justifyTablet: {
            type: "string",
            default: ""
        },
        justifyTabletLandscape: {
            type: "string",
            default: ""
        },
        justifyTabletPro: {
            type: "string",
            default: ""
        },
        justifyTabletProLandscape: {
            type: "string",
            default: ""
        },
        justifyDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$fc4f22f8a866e147$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $fc4f22f8a866e147$var$addCustomControlAttributes); // the component
function $fc4f22f8a866e147$var$JustifyFlex(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $fc4f22f8a866e147$var$_name)) return /*#__PURE__*/ React.createElement($fc4f22f8a866e147$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $fc4f22f8a866e147$var$_name)) return /*#__PURE__*/ React.createElement($fc4f22f8a866e147$var$Fragment, null);
    return /*#__PURE__*/ React.createElement($fc4f22f8a866e147$var$Fragment, null, /*#__PURE__*/ React.createElement($fc4f22f8a866e147$var$SelectControl, {
        label: $fc4f22f8a866e147$var$__("Justify Content", "sv100_premium"),
        value: values[$fc4f22f8a866e147$var$_prefix + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $fc4f22f8a866e147$var$_name, $fc4f22f8a866e147$var$_prefix, (0, $96b3d85aa11ece36$export$2e2bcd8739ae039));
        },
        options: [
            {
                value: "",
                label: "Select"
            },
            {
                value: "center",
                label: "Center"
            },
            {
                value: "flex-start",
                label: "Flex Start"
            },
            {
                value: "flex-end",
                label: "Flex End"
            },
            {
                value: "space-between",
                label: "Space Between"
            },
            {
                value: "space-around",
                label: "Space Around"
            }
        ]
    }));
}
var $fc4f22f8a866e147$export$2e2bcd8739ae039 = $fc4f22f8a866e147$var$JustifyFlex;



function $9bfd00304e31c6d0$var$EditorStyles(attr) {
    const wpBlockSelector = ".sv100-premium-block-core-mod-flex.wp-block-columns";
    const { alignDesktop: alignDesktop , alignMobile: alignMobile , alignMobileLandscape: alignMobileLandscape , alignTablet: alignTablet , alignTabletLandscape: alignTabletLandscape , alignTabletPro: alignTabletPro , alignTabletProLandscape: alignTabletProLandscape  } = attr;
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "align-items": alignMobile + appendix
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "align-items": alignMobileLandscape + appendix
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "align-items": alignTablet + appendix
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "align-items": alignTabletLandscape + appendix
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "align-items": alignTabletPro + appendix
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "align-items": alignTabletProLandscape + appendix
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "align-items": alignDesktop + appendix
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile", "from");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $9bfd00304e31c6d0$export$2e2bcd8739ae039 = $9bfd00304e31c6d0$var$EditorStyles;



const { Fragment: $b2719df047dcd789$var$Fragment  } = wp.element;
const { SelectControl: $b2719df047dcd789$var$SelectControl  } = wp.components;
const { addFilter: $b2719df047dcd789$var$addFilter  } = wp.hooks;
const { __: $b2719df047dcd789$var$__  } = wp.i18n;
const $b2719df047dcd789$var$_name = "AlignFlex";
const $b2719df047dcd789$var$_prefix = "align"; // register attributes
const $b2719df047dcd789$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $b2719df047dcd789$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        alignActive: {
            type: "boolean",
            default: false
        },
        alignMobile: {
            type: "string",
            default: ""
        },
        alignMobileLandscape: {
            type: "string",
            default: ""
        },
        alignTablet: {
            type: "string",
            default: ""
        },
        alignTabletLandscape: {
            type: "string",
            default: ""
        },
        alignTabletPro: {
            type: "string",
            default: ""
        },
        alignTabletProLandscape: {
            type: "string",
            default: ""
        },
        alignDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$b2719df047dcd789$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $b2719df047dcd789$var$addCustomControlAttributes); // the component
function $b2719df047dcd789$var$AlignFlex(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $b2719df047dcd789$var$_name)) return /*#__PURE__*/ React.createElement($b2719df047dcd789$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $b2719df047dcd789$var$_name)) return /*#__PURE__*/ React.createElement($b2719df047dcd789$var$Fragment, null);
    return /*#__PURE__*/ React.createElement($b2719df047dcd789$var$Fragment, null, /*#__PURE__*/ React.createElement($b2719df047dcd789$var$SelectControl, {
        label: $b2719df047dcd789$var$__("Align Items", "sv100_premium"),
        value: values[$b2719df047dcd789$var$_prefix + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $b2719df047dcd789$var$_name, $b2719df047dcd789$var$_prefix, (0, $9bfd00304e31c6d0$export$2e2bcd8739ae039));
        },
        options: [
            {
                value: "",
                label: "Select"
            },
            {
                value: "center",
                label: "Center"
            },
            {
                value: "flex-start",
                label: "Flex Start"
            },
            {
                value: "flex-end",
                label: "Flex End"
            },
            {
                value: "stretch",
                label: "stretch"
            }
        ]
    }));
}
var $b2719df047dcd789$export$2e2bcd8739ae039 = $b2719df047dcd789$var$AlignFlex;








const { Fragment: $603b00a8dca58242$var$Fragment  } = wp.element;
const { ToggleControl: $603b00a8dca58242$var$ToggleControl , PanelRow: $603b00a8dca58242$var$PanelRow , Tooltip: $603b00a8dca58242$var$Tooltip  } = wp.components;
const { addFilter: $603b00a8dca58242$var$addFilter  } = wp.hooks;
const { __: $603b00a8dca58242$var$__  } = wp.i18n;
const $603b00a8dca58242$var$_name = "flexCoreColumns";
const $603b00a8dca58242$var$_prefix = "flexCoreColumns"; // register attributes
const $603b00a8dca58242$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $603b00a8dca58242$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        flexCoreColumnsActive: {
            type: "boolean",
            default: false
        },
        flexCoreColumnsInit: {
            type: "boolean",
            default: false
        }
    });
    return settings;
};
$603b00a8dca58242$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $603b00a8dca58242$var$addCustomControlAttributes); // the component
function $603b00a8dca58242$var$FlexCoreColumns(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $603b00a8dca58242$var$_name)) return /*#__PURE__*/ React.createElement($603b00a8dca58242$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab; // initialise default values -------------------------------------------------
    if (values[$603b00a8dca58242$var$_prefix + "Active"] === true && values.flexCoreColumnsInit === false) {
        // move this later to a global function
        const attr = props.attributes;
        attr.parsedCSS = JSON.parse(attr.parsedCSS); // parse sub module CSS
        attr.parsedCSS["GapFlex"] = (0, $40c80b257273d5cd$export$2e2bcd8739ae039)(attr, props.name);
        attr.parsedCSS["StackFlex"] = (0, $c855a9a458ffcf3e$export$2e2bcd8739ae039)(attr, props.name); //@todo why no justify and wrap css here? looks like that would be buggy, but makes no sense?
        //collapse css objects
        let css = "";
        Object.keys(attr.parsedCSS).map(function(key, index) {
            if (attr[(0, $20b4a97a61b3fccb$export$5b1f80f3c282648c)(key) + "Active"] === true) css += attr.parsedCSS[key];
        }); // update properties for rerender and injection
        props.setAttributes({
            parsedCSS: JSON.stringify(attr.parsedCSS),
            parsedCSSString: css,
            // this gets injected
            flexCoreColumnsInit: true
        });
    } // initialise default values -------------------------------------------------
    if (values[$603b00a8dca58242$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($603b00a8dca58242$var$Fragment, null, /*#__PURE__*/ React.createElement($603b00a8dca58242$var$ToggleControl, {
        label: $603b00a8dca58242$var$__("Columns Control", "sv100_premium"),
        checked: values[$603b00a8dca58242$var$_prefix + "Active"],
        onChange: (val)=>{
            const list = (0, $20b4a97a61b3fccb$export$b15ba63803cbc3a1)(props, [
                "sv100-premium-block-core-mod-flex"
            ]);
            (0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$603b00a8dca58242$var$_prefix + "Active"]: val,
                ["gapFlexActive"]: val,
                // fake opt-in for sub modules
                ["stackFlexActive"]: val,
                // fake opt-in for sub modules
                ["wrapFlexActive"]: val,
                // fake opt-in for sub modules
                ["justifyFlexActive"]: val,
                // fake opt-in for sub modules
                ["alignFlexActive"]: val,
                // fake opt-in for sub modules
                _classNamesList: list
            });
        },
        help: $603b00a8dca58242$var$__("This option forces flex behaviour on the selected columns block and only works if enabled constantly. Native stacking will not work with this option enabled.", "sv100_premium")
    }), /*#__PURE__*/ React.createElement((0, $7b93dac3912d9f2f$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $47170f8e9f9bcd6f$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $32d1cadc161b80c5$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $fc4f22f8a866e147$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $b2719df047dcd789$export$2e2bcd8739ae039), props));
    else return /*#__PURE__*/ React.createElement($603b00a8dca58242$var$Fragment, null, /*#__PURE__*/ React.createElement($603b00a8dca58242$var$ToggleControl, {
        label: $603b00a8dca58242$var$__("Columns Control", "sv100_premium"),
        checked: values[$603b00a8dca58242$var$_prefix + "Active"],
        onChange: (val)=>{
            const list = (0, $20b4a97a61b3fccb$export$378a7f138e43d140)(props, [
                "sv100-premium-block-core-mod-flex"
            ]);
            (0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$603b00a8dca58242$var$_prefix + "Active"]: val,
                ["gapFlexActive"]: val,
                // fake opt-in for sub modules
                ["stackFlexActive"]: val,
                // fake opt-in for sub modules
                ["wrapFlexActive"]: val,
                // fake opt-in for sub modules
                ["justifyFlexActive"]: val,
                // fake opt-in for sub modules
                ["alignFlexActive"]: val,
                // fake opt-in for sub modules
                _classNamesList: list
            });
        }
    }));
}
var $603b00a8dca58242$export$2e2bcd8739ae039 = $603b00a8dca58242$var$FlexCoreColumns;



function $204a08ef72af0170$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { marginTopMobile: marginTopMobile , marginTopMobileLandscape: marginTopMobileLandscape , marginTopTablet: marginTopTablet , marginTopTabletLandscape: marginTopTabletLandscape , marginTopTabletPro: marginTopTabletPro , marginTopTabletProLandscape: marginTopTabletProLandscape , marginTopDesktop: marginTopDesktop , marginBottomMobile: marginBottomMobile , marginBottomMobileLandscape: marginBottomMobileLandscape , marginBottomTablet: marginBottomTablet , marginBottomTabletLandscape: marginBottomTabletLandscape , marginBottomTabletPro: marginBottomTabletPro , marginBottomTabletProLandscape: marginBottomTabletProLandscape , marginBottomDesktop: marginBottomDesktop , marginLeftMobile: marginLeftMobile , marginLeftMobileLandscape: marginLeftMobileLandscape , marginLeftTablet: marginLeftTablet , marginLeftTabletLandscape: marginLeftTabletLandscape , marginLeftTabletPro: marginLeftTabletPro , marginLeftTabletProLandscape: marginLeftTabletProLandscape , marginLeftDesktop: marginLeftDesktop , marginRightMobile: marginRightMobile , marginRightMobileLandscape: marginRightMobileLandscape , marginRightTablet: marginRightTablet , marginRightTabletLandscape: marginRightTabletLandscape , marginRightTabletPro: marginRightTabletPro , marginRightTabletProLandscape: marginRightTabletProLandscape , marginRightDesktop: marginRightDesktop  } = attr; // for later support of other units
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "margin-top": marginTopMobile !== "" ? marginTopMobile + appendix : "",
            "margin-bottom": marginBottomMobile !== "" ? marginBottomMobile + appendix : "",
            "margin-left": marginLeftMobile !== "" ? marginLeftMobile + appendix : "",
            "margin-right": marginRightMobile !== "" ? marginRightMobile + appendix : ""
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "margin-top": marginTopMobileLandscape !== "" ? marginTopMobileLandscape + appendix : "",
            "margin-bottom": marginBottomMobileLandscape !== "" ? marginBottomMobileLandscape + appendix : "",
            "margin-left": marginLeftMobileLandscape !== "" ? marginLeftMobileLandscape + appendix : "",
            "margin-right": marginRightMobileLandscape !== "" ? marginRightMobileLandscape + appendix : ""
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "margin-top": marginTopTablet !== "" ? marginTopTablet + appendix : "",
            "margin-bottom": marginBottomTablet !== "" ? marginBottomTablet + appendix : "",
            "margin-left": marginLeftTablet !== "" ? marginLeftTablet + appendix : "",
            "margin-right": marginRightTablet !== "" ? marginRightTablet + appendix : ""
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "margin-top": marginTopTabletLandscape !== "" ? marginTopTabletLandscape + appendix : "",
            "margin-bottom": marginBottomTabletLandscape !== "" ? marginBottomTabletLandscape + appendix : "",
            "margin-left": marginLeftTabletLandscape !== "" ? marginLeftTabletLandscape + appendix : "",
            "margin-right": marginRightTabletLandscape !== "" ? marginRightTabletLandscape + appendix : ""
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "margin-top": marginTopTabletPro !== "" ? marginTopTabletPro + appendix : "",
            "margin-bottom": marginBottomTabletPro !== "" ? marginBottomTabletPro + appendix : "",
            "margin-left": marginLeftTabletPro !== "" ? marginLeftTabletPro + appendix : "",
            "margin-right": marginRightTabletPro !== "" ? marginRightTabletPro + appendix : ""
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "margin-top": marginTopTabletProLandscape !== "" ? marginTopTabletProLandscape + appendix : "",
            "margin-bottom": marginBottomTabletProLandscape !== "" ? marginBottomTabletProLandscape + appendix : "",
            "margin-left": marginLeftTabletProLandscape !== "" ? marginLeftTabletProLandscape + appendix : "",
            "margin-right": marginRightTabletProLandscape !== "" ? marginRightTabletProLandscape + appendix : ""
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "margin-top": marginTopDesktop !== "" ? marginTopDesktop + appendix : "",
            "margin-bottom": marginBottomDesktop !== "" ? marginBottomDesktop + appendix : "",
            "margin-left": marginLeftDesktop !== "" ? marginLeftDesktop + appendix : "",
            "margin-right": marginRightDesktop !== "" ? marginRightDesktop + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $204a08ef72af0170$export$2e2bcd8739ae039 = $204a08ef72af0170$var$EditorStyles;



const { Fragment: $0e9638b714af9bb7$var$Fragment  } = wp.element;
const { PanelRow: $0e9638b714af9bb7$var$PanelRow , ToggleControl: $0e9638b714af9bb7$var$ToggleControl , __experimentalBoxControl: $0e9638b714af9bb7$var$__experimentalBoxControl  } = wp.components;
const $0e9638b714af9bb7$var$BoxControl = $0e9638b714af9bb7$var$__experimentalBoxControl;
const { addFilter: $0e9638b714af9bb7$var$addFilter  } = wp.hooks;
const { __: $0e9638b714af9bb7$var$__  } = wp.i18n;
const $0e9638b714af9bb7$var$_name = "Margin";
const $0e9638b714af9bb7$var$_prefix = "margin"; // register attributes
const $0e9638b714af9bb7$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $0e9638b714af9bb7$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        marginActive: {
            type: "boolean",
            default: false
        },
        marginTopMobile: {
            type: "string",
            default: ""
        },
        marginTopMobileLandscape: {
            type: "string",
            default: ""
        },
        marginTopTablet: {
            type: "string",
            default: ""
        },
        marginTopTabletLandscape: {
            type: "string",
            default: ""
        },
        marginTopTabletPro: {
            type: "string",
            default: ""
        },
        marginTopTabletProLandscape: {
            type: "string",
            default: ""
        },
        marginTopDesktop: {
            type: "string",
            default: ""
        },
        marginBottomMobile: {
            type: "string",
            default: ""
        },
        marginBottomMobileLandscape: {
            type: "string",
            default: ""
        },
        marginBottomTablet: {
            type: "string",
            default: ""
        },
        marginBottomTabletLandscape: {
            type: "string",
            default: ""
        },
        marginBottomTabletPro: {
            type: "string",
            default: ""
        },
        marginBottomTabletProLandscape: {
            type: "string",
            default: ""
        },
        marginBottomDesktop: {
            type: "string",
            default: ""
        },
        marginLeftMobile: {
            type: "string",
            default: ""
        },
        marginLeftMobileLandscape: {
            type: "string",
            default: ""
        },
        marginLeftTablet: {
            type: "string",
            default: ""
        },
        marginLeftTabletLandscape: {
            type: "string",
            default: ""
        },
        marginLeftTabletPro: {
            type: "string",
            default: ""
        },
        marginLeftTabletProLandscape: {
            type: "string",
            default: ""
        },
        marginLeftDesktop: {
            type: "string",
            default: ""
        },
        marginRightMobile: {
            type: "string",
            default: ""
        },
        marginRightMobileLandscape: {
            type: "string",
            default: ""
        },
        marginRightTablet: {
            type: "string",
            default: ""
        },
        marginRightTabletLandscape: {
            type: "string",
            default: ""
        },
        marginRightTabletPro: {
            type: "string",
            default: ""
        },
        marginRightTabletProLandscape: {
            type: "string",
            default: ""
        },
        marginRightDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$0e9638b714af9bb7$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $0e9638b714af9bb7$var$addCustomControlAttributes); // the component
function $0e9638b714af9bb7$var$Margin(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $0e9638b714af9bb7$var$_name)) return /*#__PURE__*/ React.createElement($0e9638b714af9bb7$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    const boxValues = {
        top: values[$0e9638b714af9bb7$var$_prefix + "Top" + currentResponsiveTab],
        right: values[$0e9638b714af9bb7$var$_prefix + "Right" + currentResponsiveTab],
        bottom: values[$0e9638b714af9bb7$var$_prefix + "Bottom" + currentResponsiveTab],
        left: values[$0e9638b714af9bb7$var$_prefix + "Left" + currentResponsiveTab]
    };
    if (values[$0e9638b714af9bb7$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($0e9638b714af9bb7$var$Fragment, null, /*#__PURE__*/ React.createElement($0e9638b714af9bb7$var$ToggleControl, {
        label: $0e9638b714af9bb7$var$__("Margins", "sv100_premium"),
        checked: values[$0e9638b714af9bb7$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$0e9638b714af9bb7$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement($0e9638b714af9bb7$var$PanelRow, null, /*#__PURE__*/ React.createElement($0e9638b714af9bb7$var$BoxControl, {
        values: boxValues,
        onChange: (values)=>(0, $20b4a97a61b3fccb$export$fb486fe33c676ab0)(values, props, $0e9638b714af9bb7$var$_name, $0e9638b714af9bb7$var$_prefix, (0, $204a08ef72af0170$export$2e2bcd8739ae039)),
        onUnitChange: (values)=>(0, $20b4a97a61b3fccb$export$fb486fe33c676ab0)(values, props, $0e9638b714af9bb7$var$_name, $0e9638b714af9bb7$var$_prefix, (0, $204a08ef72af0170$export$2e2bcd8739ae039)),
        allowReset: false,
        label: "",
        inputProps: {
            min: -99999
        }
    })));
    else return /*#__PURE__*/ React.createElement($0e9638b714af9bb7$var$Fragment, null, /*#__PURE__*/ React.createElement($0e9638b714af9bb7$var$ToggleControl, {
        label: $0e9638b714af9bb7$var$__("Margins", "sv100_premium"),
        checked: values[$0e9638b714af9bb7$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$0e9638b714af9bb7$var$_prefix + "Active"]: val
            })
    }));
}
var $0e9638b714af9bb7$export$2e2bcd8739ae039 = $0e9638b714af9bb7$var$Margin;



function $cbe467d0e1398a10$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { paddingTopMobile: paddingTopMobile , paddingTopMobileLandscape: paddingTopMobileLandscape , paddingTopTablet: paddingTopTablet , paddingTopTabletLandscape: paddingTopTabletLandscape , paddingTopTabletPro: paddingTopTabletPro , paddingTopTabletProLandscape: paddingTopTabletProLandscape , paddingTopDesktop: paddingTopDesktop , paddingBottomMobile: paddingBottomMobile , paddingBottomMobileLandscape: paddingBottomMobileLandscape , paddingBottomTablet: paddingBottomTablet , paddingBottomTabletLandscape: paddingBottomTabletLandscape , paddingBottomTabletPro: paddingBottomTabletPro , paddingBottomTabletProLandscape: paddingBottomTabletProLandscape , paddingBottomDesktop: paddingBottomDesktop , paddingLeftMobile: paddingLeftMobile , paddingLeftMobileLandscape: paddingLeftMobileLandscape , paddingLeftTablet: paddingLeftTablet , paddingLeftTabletLandscape: paddingLeftTabletLandscape , paddingLeftTabletPro: paddingLeftTabletPro , paddingLeftTabletProLandscape: paddingLeftTabletProLandscape , paddingLeftDesktop: paddingLeftDesktop , paddingRightMobile: paddingRightMobile , paddingRightMobileLandscape: paddingRightMobileLandscape , paddingRightTablet: paddingRightTablet , paddingRightTabletLandscape: paddingRightTabletLandscape , paddingRightTabletPro: paddingRightTabletPro , paddingRightTabletProLandscape: paddingRightTabletProLandscape , paddingRightDesktop: paddingRightDesktop  } = attr; // for later support of other units
    const unit = "px";
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "padding-top": paddingTopMobile !== "" ? paddingTopMobile + appendix : "",
            "padding-bottom": paddingBottomMobile !== "" ? paddingBottomMobile + appendix : "",
            "padding-left": paddingLeftMobile !== "" ? paddingLeftMobile + appendix : "",
            "padding-right": paddingRightMobile !== "" ? paddingRightMobile + appendix : ""
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "padding-top": paddingTopMobileLandscape !== "" ? paddingTopMobileLandscape + appendix : "",
            "padding-bottom": paddingBottomMobileLandscape !== "" ? paddingBottomMobileLandscape + appendix : "",
            "padding-left": paddingLeftMobileLandscape !== "" ? paddingLeftMobileLandscape + appendix : "",
            "padding-right": paddingRightMobileLandscape !== "" ? paddingRightMobileLandscape + appendix : ""
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "padding-top": paddingTopTablet !== "" ? paddingTopTablet + appendix : "",
            "padding-bottom": paddingBottomTablet !== "" ? paddingBottomTablet + appendix : "",
            "padding-left": paddingLeftTablet !== "" ? paddingLeftTablet + appendix : "",
            "padding-right": paddingRightTablet !== "" ? paddingRightTablet + appendix : ""
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "padding-top": paddingTopTabletLandscape !== "" ? paddingTopTabletLandscape + appendix : "",
            "padding-bottom": paddingBottomTabletLandscape !== "" ? paddingBottomTabletLandscape + appendix : "",
            "padding-left": paddingLeftTabletLandscape !== "" ? paddingLeftTabletLandscape + appendix : "",
            "padding-right": paddingRightTabletLandscape !== "" ? paddingRightTabletLandscape + appendix : ""
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "padding-top": paddingTopTabletPro !== "" ? paddingTopTabletPro + appendix : "",
            "padding-bottom": paddingBottomTabletPro !== "" ? paddingBottomTabletPro + appendix : "",
            "padding-left": paddingLeftTabletPro !== "" ? paddingLeftTabletPro + appendix : "",
            "padding-right": paddingRightTabletPro !== "" ? paddingRightTabletPro + appendix : ""
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "padding-top": paddingTopTabletProLandscape !== "" ? paddingTopTabletProLandscape + appendix : "",
            "padding-bottom": paddingBottomTabletProLandscape !== "" ? paddingBottomTabletProLandscape + appendix : "",
            "padding-left": paddingLeftTabletProLandscape !== "" ? paddingLeftTabletProLandscape + appendix : "",
            "padding-right": paddingRightTabletProLandscape !== "" ? paddingRightTabletProLandscape + appendix : ""
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "padding-top": paddingTopDesktop !== "" ? paddingTopDesktop + appendix : "",
            "padding-bottom": paddingBottomDesktop !== "" ? paddingBottomDesktop + appendix : "",
            "padding-left": paddingLeftDesktop !== "" ? paddingLeftDesktop + appendix : "",
            "padding-right": paddingRightDesktop !== "" ? paddingRightDesktop + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $cbe467d0e1398a10$export$2e2bcd8739ae039 = $cbe467d0e1398a10$var$EditorStyles;



const { Fragment: $12467658f74e69ae$var$Fragment  } = wp.element;
const { PanelRow: $12467658f74e69ae$var$PanelRow , ToggleControl: $12467658f74e69ae$var$ToggleControl , __experimentalBoxControl: $12467658f74e69ae$var$__experimentalBoxControl  } = wp.components;
const $12467658f74e69ae$var$BoxControl = $12467658f74e69ae$var$__experimentalBoxControl;
const { addFilter: $12467658f74e69ae$var$addFilter  } = wp.hooks;
const { __: $12467658f74e69ae$var$__  } = wp.i18n;
const $12467658f74e69ae$var$_name = "Padding";
const $12467658f74e69ae$var$_prefix = "padding"; // register attributes
const $12467658f74e69ae$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $12467658f74e69ae$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        paddingActive: {
            type: "boolean",
            default: false
        },
        paddingTopMobile: {
            type: "string",
            default: ""
        },
        paddingTopMobileLandscape: {
            type: "string",
            default: ""
        },
        paddingTopTablet: {
            type: "string",
            default: ""
        },
        paddingTopTabletLandscape: {
            type: "string",
            default: ""
        },
        paddingTopTabletPro: {
            type: "string",
            default: ""
        },
        paddingTopTabletProLandscape: {
            type: "string",
            default: ""
        },
        paddingTopDesktop: {
            type: "string",
            default: ""
        },
        paddingBottomMobile: {
            type: "string",
            default: ""
        },
        paddingBottomMobileLandscape: {
            type: "string",
            default: ""
        },
        paddingBottomTablet: {
            type: "string",
            default: ""
        },
        paddingBottomTabletLandscape: {
            type: "string",
            default: ""
        },
        paddingBottomTabletPro: {
            type: "string",
            default: ""
        },
        paddingBottomTabletProLandscape: {
            type: "string",
            default: ""
        },
        paddingBottomDesktop: {
            type: "string",
            default: ""
        },
        paddingLeftMobile: {
            type: "string",
            default: ""
        },
        paddingLeftMobileLandscape: {
            type: "string",
            default: ""
        },
        paddingLeftTablet: {
            type: "string",
            default: ""
        },
        paddingLeftTabletLandscape: {
            type: "string",
            default: ""
        },
        paddingLeftTabletPro: {
            type: "string",
            default: ""
        },
        paddingLeftTabletProLandscape: {
            type: "string",
            default: ""
        },
        paddingLeftDesktop: {
            type: "string",
            default: ""
        },
        paddingRightMobile: {
            type: "string",
            default: ""
        },
        paddingRightMobileLandscape: {
            type: "string",
            default: ""
        },
        paddingRightTablet: {
            type: "string",
            default: ""
        },
        paddingRightTabletLandscape: {
            type: "string",
            default: ""
        },
        paddingRightTabletPro: {
            type: "string",
            default: ""
        },
        paddingRightTabletProLandscape: {
            type: "string",
            default: ""
        },
        paddingRightDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$12467658f74e69ae$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $12467658f74e69ae$var$addCustomControlAttributes); // the component
function $12467658f74e69ae$var$Padding(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $12467658f74e69ae$var$_name)) return /*#__PURE__*/ React.createElement($12467658f74e69ae$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    const boxValues = {
        top: values[$12467658f74e69ae$var$_prefix + "Top" + currentResponsiveTab],
        right: values[$12467658f74e69ae$var$_prefix + "Right" + currentResponsiveTab],
        bottom: values[$12467658f74e69ae$var$_prefix + "Bottom" + currentResponsiveTab],
        left: values[$12467658f74e69ae$var$_prefix + "Left" + currentResponsiveTab]
    };
    if (values[$12467658f74e69ae$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($12467658f74e69ae$var$Fragment, null, /*#__PURE__*/ React.createElement($12467658f74e69ae$var$ToggleControl, {
        label: $12467658f74e69ae$var$__("Paddings", "sv100_premium"),
        checked: values[$12467658f74e69ae$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$12467658f74e69ae$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement($12467658f74e69ae$var$PanelRow, null, /*#__PURE__*/ React.createElement($12467658f74e69ae$var$BoxControl, {
        values: boxValues,
        onChange: (values)=>(0, $20b4a97a61b3fccb$export$fb486fe33c676ab0)(values, props, $12467658f74e69ae$var$_name, $12467658f74e69ae$var$_prefix, (0, $cbe467d0e1398a10$export$2e2bcd8739ae039)),
        onUnitChange: (values)=>(0, $20b4a97a61b3fccb$export$fb486fe33c676ab0)(values, props, $12467658f74e69ae$var$_name, $12467658f74e69ae$var$_prefix, (0, $cbe467d0e1398a10$export$2e2bcd8739ae039)),
        allowReset: false,
        label: ""
    })));
    else return /*#__PURE__*/ React.createElement($12467658f74e69ae$var$Fragment, null, /*#__PURE__*/ React.createElement($12467658f74e69ae$var$ToggleControl, {
        label: $12467658f74e69ae$var$__("Paddings", "sv100_premium"),
        checked: values[$12467658f74e69ae$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$12467658f74e69ae$var$_prefix + "Active"]: val
            })
    }));
}
var $12467658f74e69ae$export$2e2bcd8739ae039 = $12467658f74e69ae$var$Padding;



function $081e427aad95fb75$var$EditorStyles(attr, name) {
    let wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr) + ":not(.block-editor-block-list__block)"; // let wpBlockSelectorEditor = '.editor-styles-wrapper';
    const { hideDesktop: hideDesktop , hideMobile: hideMobile , hideMobileLandscape: hideMobileLandscape , hideTablet: hideTablet , hideTabletLandscape: hideTabletLandscape , hideTabletPro: hideTabletPro , hideTabletProLandscape: hideTabletProLandscape  } = attr;
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "display": hideMobile === true ? "none" + appendix : ""
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "display": hideMobileLandscape === true ? "none" + appendix : ""
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "display": hideTablet === true ? "none" + appendix : ""
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "display": hideTabletLandscape === true ? "none" + appendix : ""
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "display": hideTabletPro === true ? "none" + appendix : ""
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "display": hideTabletProLandscape === true ? "none" + appendix : ""
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "display": hideDesktop === true ? "none" + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile", "between");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape", "between");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet", "between");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape", "between");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro", "between");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape", "between");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop", "between");
    return css;
}
var $081e427aad95fb75$export$2e2bcd8739ae039 = $081e427aad95fb75$var$EditorStyles;



const { Fragment: $cc5ae2ca55ffe7d8$var$Fragment  } = wp.element;
const { ToggleControl: $cc5ae2ca55ffe7d8$var$ToggleControl  } = wp.components;
const { addFilter: $cc5ae2ca55ffe7d8$var$addFilter  } = wp.hooks;
const { __: $cc5ae2ca55ffe7d8$var$__  } = wp.i18n;
const $cc5ae2ca55ffe7d8$var$_name = "Hide";
const $cc5ae2ca55ffe7d8$var$_prefix = "hide"; // register attributes
const $cc5ae2ca55ffe7d8$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $cc5ae2ca55ffe7d8$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        hideMobile: {
            type: "boolean",
            default: false
        },
        hideMobileLandscape: {
            type: "boolean",
            default: false
        },
        hideTablet: {
            type: "boolean",
            default: false
        },
        hideTabletLandscape: {
            type: "boolean",
            default: false
        },
        hideTabletPro: {
            type: "boolean",
            default: false
        },
        hideTabletProLandscape: {
            type: "boolean",
            default: false
        },
        hideDesktop: {
            type: "boolean",
            default: false
        },
        hideActive: {
            type: "boolean",
            default: true
        } // fake opt-in
    });
    return settings;
};
$cc5ae2ca55ffe7d8$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $cc5ae2ca55ffe7d8$var$addCustomControlAttributes); // the component
function $cc5ae2ca55ffe7d8$var$Hide(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $cc5ae2ca55ffe7d8$var$_name)) return /*#__PURE__*/ React.createElement($cc5ae2ca55ffe7d8$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    return /*#__PURE__*/ React.createElement($cc5ae2ca55ffe7d8$var$Fragment, null, /*#__PURE__*/ React.createElement($cc5ae2ca55ffe7d8$var$ToggleControl, {
        label: $cc5ae2ca55ffe7d8$var$__("Hide", "sv100_premium"),
        value: values[$cc5ae2ca55ffe7d8$var$_prefix + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $cc5ae2ca55ffe7d8$var$_name, $cc5ae2ca55ffe7d8$var$_prefix, (0, $081e427aad95fb75$export$2e2bcd8739ae039)),
        checked: props.attributes[$cc5ae2ca55ffe7d8$var$_prefix + currentResponsiveTab]
    }));
}
var $cc5ae2ca55ffe7d8$export$2e2bcd8739ae039 = $cc5ae2ca55ffe7d8$var$Hide;



function $567b3346a7758481$var$EditorStyles(attr, name) {
    let wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr) + ":not(.block-editor-block-list__block)"; //const wpBlockSelector = getBlockClassSelector(name, attr);
    const { positionMobile: positionMobile , positionMobileLandscape: positionMobileLandscape , positionTablet: positionTablet , positionTabletLandscape: positionTabletLandscape , positionTabletPro: positionTabletPro , positionTabletProLandscape: positionTabletProLandscape , positionDesktop: positionDesktop , positionTopMobile: positionTopMobile , positionTopMobileLandscape: positionTopMobileLandscape , positionTopTablet: positionTopTablet , positionTopTabletLandscape: positionTopTabletLandscape , positionTopTabletPro: positionTopTabletPro , positionTopTabletProLandscape: positionTopTabletProLandscape , positionTopDesktop: positionTopDesktop , positionBottomMobile: positionBottomMobile , positionBottomMobileLandscape: positionBottomMobileLandscape , positionBottomTablet: positionBottomTablet , positionBottomTabletLandscape: positionBottomTabletLandscape , positionBottomTabletPro: positionBottomTabletPro , positionBottomTabletProLandscape: positionBottomTabletProLandscape , positionBottomDesktop: positionBottomDesktop , positionLeftMobile: positionLeftMobile , positionLeftMobileLandscape: positionLeftMobileLandscape , positionLeftTablet: positionLeftTablet , positionLeftTabletLandscape: positionLeftTabletLandscape , positionLeftTabletPro: positionLeftTabletPro , positionLeftTabletProLandscape: positionLeftTabletProLandscape , positionLeftDesktop: positionLeftDesktop , positionRightMobile: positionRightMobile , positionRightMobileLandscape: positionRightMobileLandscape , positionRightTablet: positionRightTablet , positionRightTabletLandscape: positionRightTabletLandscape , positionRightTabletPro: positionRightTabletPro , positionRightTabletProLandscape: positionRightTabletProLandscape , positionRightDesktop: positionRightDesktop , positionZindexMobile: positionZindexMobile , positionZindexMobileLandscape: positionZindexMobileLandscape , positionZindexTablet: positionZindexTablet , positionZindexTabletLandscape: positionZindexTabletLandscape , positionZindexTabletPro: positionZindexTabletPro , positionZindexTabletProLandscape: positionZindexTabletProLandscape , positionZindexDesktop: positionZindexDesktop  } = attr; // for later support of other units
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "position": positionMobile !== "" ? positionMobile + appendix : "",
            "top": positionTopMobile !== "" ? positionTopMobile + appendix : "",
            "bottom": positionBottomMobile !== "" ? positionBottomMobile + appendix : "",
            "left": positionLeftMobile !== "" ? positionLeftMobile + appendix : "",
            "right": positionRightMobile !== "" ? positionRightMobile + appendix : "",
            "z-index": positionZindexMobile !== "" ? positionZindexMobile + appendix : ""
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "position": positionMobileLandscape !== "" ? positionMobileLandscape + appendix : "",
            "top": positionTopMobileLandscape !== "" ? positionTopMobileLandscape + appendix : "",
            "bottom": positionBottomMobileLandscape !== "" ? positionBottomMobileLandscape + appendix : "",
            "left": positionLeftMobileLandscape !== "" ? positionLeftMobileLandscape + appendix : "",
            "right": positionRightMobileLandscape !== "" ? positionRightMobileLandscape + appendix : "",
            "z-index": positionZindexMobileLandscape !== "" ? positionZindexMobileLandscape + appendix : ""
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "position": positionTablet !== "" ? positionTablet + appendix : "",
            "top": positionTopTablet !== "" ? positionTopTablet + appendix : "",
            "bottom": positionBottomTablet !== "" ? positionBottomTablet + appendix : "",
            "left": positionLeftTablet !== "" ? positionLeftTablet + appendix : "",
            "right": positionRightTablet !== "" ? positionRightTablet + appendix : "",
            "z-index": positionZindexTablet !== "" ? positionZindexTablet + appendix : ""
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "position": positionTabletLandscape !== "" ? positionTabletLandscape + appendix : "",
            "top": positionTopTabletLandscape !== "" ? positionTopTabletLandscape + appendix : "",
            "bottom": positionBottomTabletLandscape !== "" ? positionBottomTabletLandscape + appendix : "",
            "left": positionLeftTabletLandscape !== "" ? positionLeftTabletLandscape + appendix : "",
            "right": positionRightTabletLandscape !== "" ? positionRightTabletLandscape + appendix : "",
            "z-index": positionZindexTabletLandscape !== "" ? positionZindexTabletLandscape + appendix : ""
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "position": positionTabletPro !== "" ? positionTabletPro + appendix : "",
            "top": positionTopTabletPro !== "" ? positionTopTabletPro + appendix : "",
            "bottom": positionBottomTabletPro !== "" ? positionBottomTabletPro + appendix : "",
            "left": positionLeftTabletPro !== "" ? positionLeftTabletPro + appendix : "",
            "right": positionRightTabletPro !== "" ? positionRightTabletPro + appendix : "",
            "z-index": positionZindexTabletPro !== "" ? positionZindexTabletPro + appendix : ""
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "position": positionTabletProLandscape !== "" ? positionTabletProLandscape + appendix : "",
            "top": positionTopTabletProLandscape !== "" ? positionTopTabletProLandscape + appendix : "",
            "bottom": positionBottomTabletProLandscape !== "" ? positionBottomTabletProLandscape + appendix : "",
            "left": positionLeftTabletProLandscape !== "" ? positionLeftTabletProLandscape + appendix : "",
            "right": positionRightTabletProLandscape !== "" ? positionRightTabletProLandscape + appendix : "",
            "z-index": positionZindexTabletProLandscape !== "" ? positionZindexTabletProLandscape + appendix : ""
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "position": positionDesktop !== "" ? positionDesktop + appendix : "",
            "top": positionTopDesktop !== "" ? positionTopDesktop + appendix : "",
            "bottom": positionBottomDesktop !== "" ? positionBottomDesktop + appendix : "",
            "left": positionLeftDesktop !== "" ? positionLeftDesktop + appendix : "",
            "right": positionRightDesktop !== "" ? positionRightDesktop + appendix : "",
            "z-index": positionZindexDesktop !== "" ? positionZindexDesktop + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $567b3346a7758481$export$2e2bcd8739ae039 = $567b3346a7758481$var$EditorStyles;



const { Fragment: $83fcdd8284e1ab12$var$Fragment  } = wp.element;
const { PanelRow: $83fcdd8284e1ab12$var$PanelRow , ToggleControl: $83fcdd8284e1ab12$var$ToggleControl , SelectControl: $83fcdd8284e1ab12$var$SelectControl , __experimentalBoxControl: $83fcdd8284e1ab12$var$__experimentalBoxControl , __experimentalInputControl: $83fcdd8284e1ab12$var$__experimentalInputControl , Flex: $83fcdd8284e1ab12$var$Flex , FlexItem: $83fcdd8284e1ab12$var$FlexItem  } = wp.components;
const $83fcdd8284e1ab12$var$BoxControl = $83fcdd8284e1ab12$var$__experimentalBoxControl;
const $83fcdd8284e1ab12$var$InputControl = $83fcdd8284e1ab12$var$__experimentalInputControl;
const { addFilter: $83fcdd8284e1ab12$var$addFilter  } = wp.hooks;
const { __: $83fcdd8284e1ab12$var$__  } = wp.i18n;
const $83fcdd8284e1ab12$var$_name = "Position";
const $83fcdd8284e1ab12$var$_prefix = "position"; // register attributes
const $83fcdd8284e1ab12$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $83fcdd8284e1ab12$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        positionActive: {
            type: "boolean",
            default: false
        },
        positionMobile: {
            type: "string",
            default: ""
        },
        positionMobileLandscape: {
            type: "string",
            default: ""
        },
        positionTablet: {
            type: "string",
            default: ""
        },
        positionTabletLandscape: {
            type: "string",
            default: ""
        },
        positionTabletPro: {
            type: "string",
            default: ""
        },
        positionTabletProLandscape: {
            type: "string",
            default: ""
        },
        positionDesktop: {
            type: "string",
            default: ""
        },
        positionTopMobile: {
            type: "string",
            default: ""
        },
        positionTopMobileLandscape: {
            type: "string",
            default: ""
        },
        positionTopTablet: {
            type: "string",
            default: ""
        },
        positionTopTabletLandscape: {
            type: "string",
            default: ""
        },
        positionTopTabletPro: {
            type: "string",
            default: ""
        },
        positionTopTabletProLandscape: {
            type: "string",
            default: ""
        },
        positionTopDesktop: {
            type: "string",
            default: ""
        },
        positionBottomMobile: {
            type: "string",
            default: ""
        },
        positionBottomMobileLandscape: {
            type: "string",
            default: ""
        },
        positionBottomTablet: {
            type: "string",
            default: ""
        },
        positionBottomTabletLandscape: {
            type: "string",
            default: ""
        },
        positionBottomTabletPro: {
            type: "string",
            default: ""
        },
        positionBottomTabletProLandscape: {
            type: "string",
            default: ""
        },
        positionBottomDesktop: {
            type: "string",
            default: ""
        },
        positionLeftMobile: {
            type: "string",
            default: ""
        },
        positionLeftMobileLandscape: {
            type: "string",
            default: ""
        },
        positionLeftTablet: {
            type: "string",
            default: ""
        },
        positionLeftTabletLandscape: {
            type: "string",
            default: ""
        },
        positionLeftTabletPro: {
            type: "string",
            default: ""
        },
        positionLeftTabletProLandscape: {
            type: "string",
            default: ""
        },
        positionLeftDesktop: {
            type: "string",
            default: ""
        },
        positionRightMobile: {
            type: "string",
            default: ""
        },
        positionRightMobileLandscape: {
            type: "string",
            default: ""
        },
        positionRightTablet: {
            type: "string",
            default: ""
        },
        positionRightTabletLandscape: {
            type: "string",
            default: ""
        },
        positionRightTabletPro: {
            type: "string",
            default: ""
        },
        positionRightTabletProLandscape: {
            type: "string",
            default: ""
        },
        positionRightDesktop: {
            type: "string",
            default: ""
        },
        positionZindexMobile: {
            type: "string",
            default: ""
        },
        positionZindexMobileLandscape: {
            type: "string",
            default: ""
        },
        positionZindexTablet: {
            type: "string",
            default: ""
        },
        positionZindexTabletLandscape: {
            type: "string",
            default: ""
        },
        positionZindexTabletPro: {
            type: "string",
            default: ""
        },
        positionZindexTabletProLandscape: {
            type: "string",
            default: ""
        },
        positionZindexDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$83fcdd8284e1ab12$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $83fcdd8284e1ab12$var$addCustomControlAttributes); // the component
function $83fcdd8284e1ab12$var$Position(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $83fcdd8284e1ab12$var$_name)) return /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    const boxValues = {
        top: values[$83fcdd8284e1ab12$var$_prefix + "Top" + currentResponsiveTab],
        right: values[$83fcdd8284e1ab12$var$_prefix + "Right" + currentResponsiveTab],
        bottom: values[$83fcdd8284e1ab12$var$_prefix + "Bottom" + currentResponsiveTab],
        left: values[$83fcdd8284e1ab12$var$_prefix + "Left" + currentResponsiveTab]
    };
    if (values[$83fcdd8284e1ab12$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$Fragment, null, /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$ToggleControl, {
        label: $83fcdd8284e1ab12$var$__("Position", "sv100_premium"),
        checked: values[$83fcdd8284e1ab12$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$83fcdd8284e1ab12$var$_prefix + "Active"]: val
            }),
        help: $83fcdd8284e1ab12$var$__("For absolute, fixed positioning etc. you should set position relative on a parent element like a group block. Positioning is only applied on frontend output, not within Gutenberg.", "sv100_premium")
    }), /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$PanelRow, {
        className: "no-margin-bottom"
    }, /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$Flex, null, /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$FlexItem, null, /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$SelectControl, {
        value: values[$83fcdd8284e1ab12$var$_prefix + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $83fcdd8284e1ab12$var$_name, $83fcdd8284e1ab12$var$_prefix, (0, $567b3346a7758481$export$2e2bcd8739ae039));
        },
        options: [
            {
                value: "",
                label: "Select"
            },
            {
                value: "relative",
                label: "Relative"
            },
            {
                value: "absolute",
                label: "Absolute"
            },
            {
                value: "fixed",
                label: "Fixed"
            },
            {
                value: "sticky",
                label: "Sticky"
            },
            {
                value: "static",
                label: "Static"
            },
            {
                value: "inherit",
                label: "Inherit"
            },
            {
                value: "initial",
                label: "Initial"
            },
            {
                value: "unset",
                label: "Unset"
            },
            {
                value: "revert",
                label: "Revert"
            }
        ]
    })), /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$FlexItem, null, /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$InputControl, {
        value: values[$83fcdd8284e1ab12$var$_prefix + "Zindex" + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $83fcdd8284e1ab12$var$_name, $83fcdd8284e1ab12$var$_prefix + "Zindex", (0, $567b3346a7758481$export$2e2bcd8739ae039));
        },
        placeholder: "Z-Index"
    })))), /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$PanelRow, null, /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$BoxControl, {
        values: boxValues,
        onChange: (values)=>(0, $20b4a97a61b3fccb$export$fb486fe33c676ab0)(values, props, $83fcdd8284e1ab12$var$_name, $83fcdd8284e1ab12$var$_prefix, (0, $567b3346a7758481$export$2e2bcd8739ae039)),
        onUnitChange: (values)=>(0, $20b4a97a61b3fccb$export$fb486fe33c676ab0)(values, props, $83fcdd8284e1ab12$var$_name, $83fcdd8284e1ab12$var$_prefix, (0, $567b3346a7758481$export$2e2bcd8739ae039)),
        allowReset: false,
        label: "",
        inputProps: {
            min: -99999
        }
    })));
    else return /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$Fragment, null, /*#__PURE__*/ React.createElement($83fcdd8284e1ab12$var$ToggleControl, {
        label: $83fcdd8284e1ab12$var$__("Position", "sv100_premium"),
        checked: values[$83fcdd8284e1ab12$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$83fcdd8284e1ab12$var$_prefix + "Active"]: val
            })
    }));
}
var $83fcdd8284e1ab12$export$2e2bcd8739ae039 = $83fcdd8284e1ab12$var$Position;



function $33e4180e7869ff63$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { borderWidthTopMobile: // border width
    borderWidthTopMobile , borderWidthTopMobileLandscape: borderWidthTopMobileLandscape , borderWidthTopTablet: borderWidthTopTablet , borderWidthTopTabletLandscape: borderWidthTopTabletLandscape , borderWidthTopTabletPro: borderWidthTopTabletPro , borderWidthTopTabletProLandscape: borderWidthTopTabletProLandscape , borderWidthTopDesktop: borderWidthTopDesktop , borderWidthRightMobile: borderWidthRightMobile , borderWidthRightMobileLandscape: borderWidthRightMobileLandscape , borderWidthRightTablet: borderWidthRightTablet , borderWidthRightTabletLandscape: borderWidthRightTabletLandscape , borderWidthRightTabletPro: borderWidthRightTabletPro , borderWidthRightTabletProLandscape: borderWidthRightTabletProLandscape , borderWidthRightDesktop: borderWidthRightDesktop , borderWidthBottomMobile: borderWidthBottomMobile , borderWidthBottomMobileLandscape: borderWidthBottomMobileLandscape , borderWidthBottomTablet: borderWidthBottomTablet , borderWidthBottomTabletLandscape: borderWidthBottomTabletLandscape , borderWidthBottomTabletPro: borderWidthBottomTabletPro , borderWidthBottomTabletProLandscape: borderWidthBottomTabletProLandscape , borderWidthBottomDesktop: borderWidthBottomDesktop , borderWidthLeftMobile: borderWidthLeftMobile , borderWidthLeftMobileLandscape: borderWidthLeftMobileLandscape , borderWidthLeftTablet: borderWidthLeftTablet , borderWidthLeftTabletLandscape: borderWidthLeftTabletLandscape , borderWidthLeftTabletPro: borderWidthLeftTabletPro , borderWidthLeftTabletProLandscape: borderWidthLeftTabletProLandscape , borderWidthLeftDesktop: borderWidthLeftDesktop , borderColorTopMobile: // color
    borderColorTopMobile , borderColorTopMobileLandscape: borderColorTopMobileLandscape , borderColorTopTablet: borderColorTopTablet , borderColorTopTabletLandscape: borderColorTopTabletLandscape , borderColorTopTabletPro: borderColorTopTabletPro , borderColorTopTabletProLandscape: borderColorTopTabletProLandscape , borderColorTopDesktop: borderColorTopDesktop , borderColorRightMobile: borderColorRightMobile , borderColorRightMobileLandscape: borderColorRightMobileLandscape , borderColorRightTablet: borderColorRightTablet , borderColorRightTabletLandscape: borderColorRightTabletLandscape , borderColorRightTabletPro: borderColorRightTabletPro , borderColorRightTabletProLandscape: borderColorRightTabletProLandscape , borderColorRightDesktop: borderColorRightDesktop , borderColorBottomMobile: borderColorBottomMobile , borderColorBottomMobileLandscape: borderColorBottomMobileLandscape , borderColorBottomTablet: borderColorBottomTablet , borderColorBottomTabletLandscape: borderColorBottomTabletLandscape , borderColorBottomTabletPro: borderColorBottomTabletPro , borderColorBottomTabletProLandscape: borderColorBottomTabletProLandscape , borderColorBottomDesktop: borderColorBottomDesktop , borderColorLeftMobile: borderColorLeftMobile , borderColorLeftMobileLandscape: borderColorLeftMobileLandscape , borderColorLeftTablet: borderColorLeftTablet , borderColorLeftTabletLandscape: borderColorLeftTabletLandscape , borderColorLeftTabletPro: borderColorLeftTabletPro , borderColorLeftTabletProLandscape: borderColorLeftTabletProLandscape , borderColorLeftDesktop: borderColorLeftDesktop , borderStyleTopMobile: // style
    borderStyleTopMobile , borderStyleTopMobileLandscape: borderStyleTopMobileLandscape , borderStyleTopTablet: borderStyleTopTablet , borderStyleTopTabletLandscape: borderStyleTopTabletLandscape , borderStyleTopTabletPro: borderStyleTopTabletPro , borderStyleTopTabletProLandscape: borderStyleTopTabletProLandscape , borderStyleTopDesktop: borderStyleTopDesktop , borderStyleRightMobile: borderStyleRightMobile , borderStyleRightMobileLandscape: borderStyleRightMobileLandscape , borderStyleRightTablet: borderStyleRightTablet , borderStyleRightTabletLandscape: borderStyleRightTabletLandscape , borderStyleRightTabletPro: borderStyleRightTabletPro , borderStyleRightTabletProLandscape: borderStyleRightTabletProLandscape , borderStyleRightDesktop: borderStyleRightDesktop , borderStyleBottomMobile: borderStyleBottomMobile , borderStyleBottomMobileLandscape: borderStyleBottomMobileLandscape , borderStyleBottomTablet: borderStyleBottomTablet , borderStyleBottomTabletLandscape: borderStyleBottomTabletLandscape , borderStyleBottomTabletPro: borderStyleBottomTabletPro , borderStyleBottomTabletProLandscape: borderStyleBottomTabletProLandscape , borderStyleBottomDesktop: borderStyleBottomDesktop , borderStyleLeftMobile: borderStyleLeftMobile , borderStyleLeftMobileLandscape: borderStyleLeftMobileLandscape , borderStyleLeftTablet: borderStyleLeftTablet , borderStyleLeftTabletLandscape: borderStyleLeftTabletLandscape , borderStyleLeftTabletPro: borderStyleLeftTabletPro , borderStyleLeftTabletProLandscape: borderStyleLeftTabletProLandscape , borderStyleLeftDesktop: borderStyleLeftDesktop  } = attr; // for later support of other units
    const appendix = " !important"; // prepare css string
    let _borderTop = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopMobile, borderStyleTopMobile, borderColorTopMobile);
    let _borderRight = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopMobile, borderStyleTopMobile, borderColorTopMobile);
    let _borderBottom = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopMobile, borderStyleTopMobile, borderColorTopMobile);
    let _borderLeft = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopMobile, borderStyleTopMobile, borderColorTopMobile); // selectors
    const mobile = {
        [wpBlockSelector]: {
            "border-top": typeof _borderTop !== "undefined" ? _borderTop + appendix : "",
            "border-right": typeof _borderRight !== "undefined" ? _borderRight + appendix : "",
            "border-bottom": typeof _borderBottom !== "undefined" ? _borderBottom + appendix : "",
            "border-left": typeof _borderLeft !== "undefined" ? _borderLeft + appendix : ""
        }
    };
    _borderTop = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopMobileLandscape, borderStyleTopMobileLandscape, borderColorTopMobileLandscape);
    _borderRight = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopMobileLandscape, borderStyleTopMobileLandscape, borderColorTopMobileLandscape);
    _borderBottom = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopMobileLandscape, borderStyleTopMobileLandscape, borderColorTopMobileLandscape);
    _borderLeft = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopMobileLandscape, borderStyleTopMobileLandscape, borderColorTopMobileLandscape);
    const mobileLandscape = {
        [wpBlockSelector]: {
            "border-top": typeof _borderTop !== "undefined" ? _borderTop + appendix : "",
            "border-right": typeof _borderRight !== "undefined" ? _borderRight + appendix : "",
            "border-bottom": typeof _borderBottom !== "undefined" ? _borderBottom + appendix : "",
            "border-left": typeof _borderLeft !== "undefined" ? _borderLeft + appendix : ""
        }
    };
    _borderTop = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTablet, borderStyleTopTablet, borderColorTopTablet);
    _borderRight = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTablet, borderStyleTopTablet, borderColorTopTablet);
    _borderBottom = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTablet, borderStyleTopTablet, borderColorTopTablet);
    _borderLeft = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTablet, borderStyleTopTablet, borderColorTopTablet);
    const tablet = {
        [wpBlockSelector]: {
            "border-top": typeof _borderTop !== "undefined" ? _borderTop + appendix : "",
            "border-right": typeof _borderRight !== "undefined" ? _borderRight + appendix : "",
            "border-bottom": typeof _borderBottom !== "undefined" ? _borderBottom + appendix : "",
            "border-left": typeof _borderLeft !== "undefined" ? _borderLeft + appendix : ""
        }
    };
    _borderTop = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletLandscape, borderStyleTopTabletLandscape, borderColorTopTabletLandscape);
    _borderRight = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletLandscape, borderStyleTopTabletLandscape, borderColorTopTabletLandscape);
    _borderBottom = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletLandscape, borderStyleTopTabletLandscape, borderColorTopTabletLandscape);
    _borderLeft = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletLandscape, borderStyleTopTabletLandscape, borderColorTopTabletLandscape);
    const tabletLandscape = {
        [wpBlockSelector]: {
            "border-top": typeof _borderTop !== "undefined" ? _borderTop + appendix : "",
            "border-right": typeof _borderRight !== "undefined" ? _borderRight + appendix : "",
            "border-bottom": typeof _borderBottom !== "undefined" ? _borderBottom + appendix : "",
            "border-left": typeof _borderLeft !== "undefined" ? _borderLeft + appendix : ""
        }
    };
    _borderTop = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletPro, borderStyleTopTabletPro, borderColorTopTabletPro);
    _borderRight = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletPro, borderStyleTopTabletPro, borderColorTopTabletPro);
    _borderBottom = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletPro, borderStyleTopTabletPro, borderColorTopTabletPro);
    _borderLeft = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletPro, borderStyleTopTabletPro, borderColorTopTabletPro);
    const tabletPro = {
        [wpBlockSelector]: {
            "border-top": typeof _borderTop !== "undefined" ? _borderTop + appendix : "",
            "border-right": typeof _borderRight !== "undefined" ? _borderRight + appendix : "",
            "border-bottom": typeof _borderBottom !== "undefined" ? _borderBottom + appendix : "",
            "border-left": typeof _borderLeft !== "undefined" ? _borderLeft + appendix : ""
        }
    };
    _borderTop = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletProLandscape, borderStyleTopTabletProLandscape, borderColorTopTabletProLandscape);
    _borderRight = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletProLandscape, borderStyleTopTabletProLandscape, borderColorTopTabletProLandscape);
    _borderBottom = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletProLandscape, borderStyleTopTabletProLandscape, borderColorTopTabletProLandscape);
    _borderLeft = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopTabletProLandscape, borderStyleTopTabletProLandscape, borderColorTopTabletProLandscape);
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "border-top": typeof _borderTop !== "undefined" ? _borderTop + appendix : "",
            "border-right": typeof _borderRight !== "undefined" ? _borderRight + appendix : "",
            "border-bottom": typeof _borderBottom !== "undefined" ? _borderBottom + appendix : "",
            "border-left": typeof _borderLeft !== "undefined" ? _borderLeft + appendix : ""
        }
    };
    _borderTop = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopDesktop, borderStyleTopDesktop, borderColorTopDesktop);
    _borderRight = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopDesktop, borderStyleTopDesktop, borderColorTopDesktop);
    _borderBottom = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopDesktop, borderStyleTopDesktop, borderColorTopDesktop);
    _borderLeft = (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(borderWidthTopDesktop, borderStyleTopDesktop, borderColorTopDesktop);
    const desktop = {
        [wpBlockSelector]: {
            "border-top": typeof _borderTop !== "undefined" ? _borderTop + appendix : "",
            "border-right": typeof _borderRight !== "undefined" ? _borderRight + appendix : "",
            "border-bottom": typeof _borderBottom !== "undefined" ? _borderBottom + appendix : "",
            "border-left": typeof _borderLeft !== "undefined" ? _borderLeft + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $33e4180e7869ff63$export$2e2bcd8739ae039 = $33e4180e7869ff63$var$EditorStyles;



const $4cdef4c438063f22$var$attributes = {
    borderActive: {
        type: "boolean",
        default: false
    },
    borderMoreActive: {
        type: "boolean",
        default: false
    },
    // border width
    borderWidthTopMobile: {
        type: "string",
        default: ""
    },
    borderWidthTopMobileLandscape: {
        type: "string",
        default: ""
    },
    borderWidthTopTablet: {
        type: "string",
        default: ""
    },
    borderWidthTopTabletLandscape: {
        type: "string",
        default: ""
    },
    borderWidthTopTabletPro: {
        type: "string",
        default: ""
    },
    borderWidthTopTabletProLandscape: {
        type: "string",
        default: ""
    },
    borderWidthTopDesktop: {
        type: "string",
        default: ""
    },
    borderWidthRightMobile: {
        type: "string",
        default: ""
    },
    borderWidthRightMobileLandscape: {
        type: "string",
        default: ""
    },
    borderWidthRightTablet: {
        type: "string",
        default: ""
    },
    borderWidthRightTabletLandscape: {
        type: "string",
        default: ""
    },
    borderWidthRightTabletPro: {
        type: "string",
        default: ""
    },
    borderWidthRightTabletProLandscape: {
        type: "string",
        default: ""
    },
    borderWidthRightDesktop: {
        type: "string",
        default: ""
    },
    borderWidthBottomMobile: {
        type: "string",
        default: ""
    },
    borderWidthBottomMobileLandscape: {
        type: "string",
        default: ""
    },
    borderWidthBottomTablet: {
        type: "string",
        default: ""
    },
    borderWidthBottomTabletLandscape: {
        type: "string",
        default: ""
    },
    borderWidthBottomTabletPro: {
        type: "string",
        default: ""
    },
    borderWidthBottomTabletProLandscape: {
        type: "string",
        default: ""
    },
    borderWidthBottomDesktop: {
        type: "string",
        default: ""
    },
    borderWidthLeftMobile: {
        type: "string",
        default: ""
    },
    borderWidthLeftMobileLandscape: {
        type: "string",
        default: ""
    },
    borderWidthLeftTablet: {
        type: "string",
        default: ""
    },
    borderWidthLeftTabletLandscape: {
        type: "string",
        default: ""
    },
    borderWidthLeftTabletPro: {
        type: "string",
        default: ""
    },
    borderWidthLeftTabletProLandscape: {
        type: "string",
        default: ""
    },
    borderWidthLeftDesktop: {
        type: "string",
        default: ""
    },
    // color
    borderColorTopMobile: {
        type: "string",
        default: "#000000"
    },
    borderColorTopMobileLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorTopTablet: {
        type: "string",
        default: "#000000"
    },
    borderColorTopTabletLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorTopTabletPro: {
        type: "string",
        default: "#000000"
    },
    borderColorTopTabletProLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorTopDesktop: {
        type: "string",
        default: "#000000"
    },
    borderColorRightMobile: {
        type: "string",
        default: "#000000"
    },
    borderColorRightMobileLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorRightTablet: {
        type: "string",
        default: "#000000"
    },
    borderColorRightTabletLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorRightTabletPro: {
        type: "string",
        default: "#000000"
    },
    borderColorRightTabletProLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorRightDesktop: {
        type: "string",
        default: "#000000"
    },
    borderColorBottomMobile: {
        type: "string",
        default: "#000000"
    },
    borderColorBottomMobileLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorBottomTablet: {
        type: "string",
        default: "#000000"
    },
    borderColorBottomTabletLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorBottomTabletPro: {
        type: "string",
        default: "#000000"
    },
    borderColorBottomTabletProLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorBottomDesktop: {
        type: "string",
        default: "#000000"
    },
    borderColorLeftMobile: {
        type: "string",
        default: "#000000"
    },
    borderColorLeftMobileLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorLeftTablet: {
        type: "string",
        default: "#000000"
    },
    borderColorLeftTabletLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorLeftTabletPro: {
        type: "string",
        default: "#000000"
    },
    borderColorLeftTabletProLandscape: {
        type: "string",
        default: "#000000"
    },
    borderColorLeftDesktop: {
        type: "string",
        default: "#000000"
    },
    // style
    borderStyleTopMobile: {
        type: "string",
        default: "solid"
    },
    borderStyleTopMobileLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleTopTablet: {
        type: "string",
        default: "solid"
    },
    borderStyleTopTabletLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleTopTabletPro: {
        type: "string",
        default: "solid"
    },
    borderStyleTopTabletProLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleTopDesktop: {
        type: "string",
        default: "solid"
    },
    borderStyleRightMobile: {
        type: "string",
        default: "solid"
    },
    borderStyleRightMobileLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleRightTablet: {
        type: "string",
        default: "solid"
    },
    borderStyleRightTabletLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleRightTabletPro: {
        type: "string",
        default: "solid"
    },
    borderStyleRightTabletProLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleRightDesktop: {
        type: "string",
        default: "solid"
    },
    borderStyleBottomMobile: {
        type: "string",
        default: "solid"
    },
    borderStyleBottomMobileLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleBottomTablet: {
        type: "string",
        default: "solid"
    },
    borderStyleBottomTabletLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleBottomTabletPro: {
        type: "string",
        default: "solid"
    },
    borderStyleBottomTabletProLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleBottomDesktop: {
        type: "string",
        default: "solid"
    },
    borderStyleLeftMobile: {
        type: "string",
        default: "solid"
    },
    borderStyleLeftMobileLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleLeftTablet: {
        type: "string",
        default: "solid"
    },
    borderStyleLeftTabletLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleLeftTabletPro: {
        type: "string",
        default: "solid"
    },
    borderStyleLeftTabletProLandscape: {
        type: "string",
        default: "solid"
    },
    borderStyleLeftDesktop: {
        type: "string",
        default: "solid"
    },
    // utils
    _borderColorPopover: {
        type: "boolean",
        default: false
    },
    _borderColorPopoverCallback: {
        type: "object",
        default: {}
    }
};
var $4cdef4c438063f22$export$2e2bcd8739ae039 = $4cdef4c438063f22$var$attributes;


const { Fragment: $94efa96b67096507$var$Fragment  } = wp.element;
const { PanelRow: $94efa96b67096507$var$PanelRow , ToggleControl: $94efa96b67096507$var$ToggleControl , __experimentalUnitControl: $94efa96b67096507$var$__experimentalUnitControl , Label: $94efa96b67096507$var$Label , Flex: $94efa96b67096507$var$Flex , FlexBlock: $94efa96b67096507$var$FlexBlock , FlexItem: $94efa96b67096507$var$FlexItem , ColorIndicator: $94efa96b67096507$var$ColorIndicator , ColorPicker: $94efa96b67096507$var$ColorPicker , ColorPalette: $94efa96b67096507$var$ColorPalette , SelectControl: $94efa96b67096507$var$SelectControl , Popover: $94efa96b67096507$var$Popover  } = wp.components;
const $94efa96b67096507$var$UnitControl = $94efa96b67096507$var$__experimentalUnitControl;
const { addFilter: $94efa96b67096507$var$addFilter  } = wp.hooks;
const { __: $94efa96b67096507$var$__  } = wp.i18n;
const $94efa96b67096507$var$_name = "Border";
const $94efa96b67096507$var$_prefix = "border"; // register attributes
const $94efa96b67096507$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $94efa96b67096507$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, settings.attributes, (0, $4cdef4c438063f22$export$2e2bcd8739ae039));
    return settings;
};
$94efa96b67096507$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $94efa96b67096507$var$addCustomControlAttributes); // the component
function $94efa96b67096507$var$Border(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $94efa96b67096507$var$_name)) return /*#__PURE__*/ React.createElement($94efa96b67096507$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = typeof props.attributes.currentResponsiveTab !== "undefined" ? props.attributes.currentResponsiveTab : "Mobile";
    const settings = wp.data.select("core/block-editor").getSettings();
    let themeColors = [];
    if (settings && settings.colors) themeColors = settings.colors;
    if (values[$94efa96b67096507$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($94efa96b67096507$var$Fragment, null, /*#__PURE__*/ React.createElement($94efa96b67096507$var$ToggleControl, {
        label: $94efa96b67096507$var$__("Border", "sv100_premium"),
        checked: values[$94efa96b67096507$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$94efa96b67096507$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement($94efa96b67096507$var$PanelRow, null, /*#__PURE__*/ React.createElement($94efa96b67096507$var$Flex, null, /*#__PURE__*/ React.createElement($94efa96b67096507$var$FlexItem, null, /*#__PURE__*/ React.createElement($94efa96b67096507$var$UnitControl, {
        value: values[$94efa96b67096507$var$_prefix + "WidthTop" + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $94efa96b67096507$var$_name, $94efa96b67096507$var$_prefix + "WidthTop", (0, $33e4180e7869ff63$export$2e2bcd8739ae039)),
        onUnitChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $94efa96b67096507$var$_name, $94efa96b67096507$var$_prefix + "WidthTop", (0, $33e4180e7869ff63$export$2e2bcd8739ae039)),
        allowReset: false
    })), /*#__PURE__*/ React.createElement($94efa96b67096507$var$FlexItem, null, /*#__PURE__*/ React.createElement($94efa96b67096507$var$SelectControl, {
        value: values[$94efa96b67096507$var$_prefix + "StyleTop" + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $94efa96b67096507$var$_name, $94efa96b67096507$var$_prefix + "StyleTop", (0, $33e4180e7869ff63$export$2e2bcd8739ae039)),
        options: [
            {
                label: $94efa96b67096507$var$__("Solid", "sv100_premium"),
                value: "solid"
            },
            {
                label: $94efa96b67096507$var$__("Dashed", "sv100_premium"),
                value: "dashed"
            },
            {
                label: $94efa96b67096507$var$__("Dotted", "sv100_premium"),
                value: "dotted"
            },
            {
                label: $94efa96b67096507$var$__("Double", "sv100_premium"),
                value: "double"
            },
            {
                label: $94efa96b67096507$var$__("Groove", "sv100_premium"),
                value: "groove"
            },
            {
                label: $94efa96b67096507$var$__("Ridge", "sv100_premium"),
                value: "ridge"
            },
            {
                label: $94efa96b67096507$var$__("Inset", "sv100_premium"),
                value: "inset"
            },
            {
                label: $94efa96b67096507$var$__("Outset", "sv100_premium"),
                value: "outset"
            }
        ]
    })), /*#__PURE__*/ React.createElement($94efa96b67096507$var$FlexItem, null, /*#__PURE__*/ React.createElement($94efa96b67096507$var$ColorIndicator, {
        className: "clickable",
        colorValue: values[$94efa96b67096507$var$_prefix + "ColorTop" + currentResponsiveTab],
        onClick: ()=>props.setAttributes({
                _borderColorPopover: true
            })
    }), values._borderColorPopover === true && /*#__PURE__*/ React.createElement($94efa96b67096507$var$Popover, {
        position: "left",
        onClose: ()=>props.setAttributes({
                _borderColorPopover: false
            })
    }, /*#__PURE__*/ React.createElement($94efa96b67096507$var$ColorPalette, {
        colors: themeColors,
        value: values[$94efa96b67096507$var$_prefix + "ColorTop" + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $94efa96b67096507$var$_name, $94efa96b67096507$var$_prefix + "ColorTop", (0, $33e4180e7869ff63$export$2e2bcd8739ae039))
    }))))));
    else return /*#__PURE__*/ React.createElement($94efa96b67096507$var$Fragment, null, /*#__PURE__*/ React.createElement($94efa96b67096507$var$ToggleControl, {
        label: $94efa96b67096507$var$__("Border", "sv100_premium"),
        checked: values[$94efa96b67096507$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$94efa96b67096507$var$_prefix + "Active"]: val
            })
    }));
}
var $94efa96b67096507$export$2e2bcd8739ae039 = $94efa96b67096507$var$Border;



function $d1bc5ef84b2f34b4$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { borderRadiusTopLeftMobile: borderRadiusTopLeftMobile , borderRadiusTopLeftMobileLandscape: borderRadiusTopLeftMobileLandscape , borderRadiusTopLeftTablet: borderRadiusTopLeftTablet , borderRadiusTopLeftTabletLandscape: borderRadiusTopLeftTabletLandscape , borderRadiusTopLeftTabletPro: borderRadiusTopLeftTabletPro , borderRadiusTopLeftTabletProLandscape: borderRadiusTopLeftTabletProLandscape , borderRadiusTopLeftDesktop: borderRadiusTopLeftDesktop , borderRadiusTopRightMobile: borderRadiusTopRightMobile , borderRadiusTopRightMobileLandscape: borderRadiusTopRightMobileLandscape , borderRadiusTopRightTablet: borderRadiusTopRightTablet , borderRadiusTopRightTabletLandscape: borderRadiusTopRightTabletLandscape , borderRadiusTopRightTabletPro: borderRadiusTopRightTabletPro , borderRadiusTopRightTabletProLandscape: borderRadiusTopRightTabletProLandscape , borderRadiusTopRightDesktop: borderRadiusTopRightDesktop , borderRadiusBottomLeftMobile: borderRadiusBottomLeftMobile , borderRadiusBottomLeftMobileLandscape: borderRadiusBottomLeftMobileLandscape , borderRadiusBottomLeftTablet: borderRadiusBottomLeftTablet , borderRadiusBottomLeftTabletLandscape: borderRadiusBottomLeftTabletLandscape , borderRadiusBottomLeftTabletPro: borderRadiusBottomLeftTabletPro , borderRadiusBottomLeftTabletProLandscape: borderRadiusBottomLeftTabletProLandscape , borderRadiusBottomLeftDesktop: borderRadiusBottomLeftDesktop , borderRadiusBottomRightMobile: borderRadiusBottomRightMobile , borderRadiusBottomRightMobileLandscape: borderRadiusBottomRightMobileLandscape , borderRadiusBottomRightTablet: borderRadiusBottomRightTablet , borderRadiusBottomRightTabletLandscape: borderRadiusBottomRightTabletLandscape , borderRadiusBottomRightTabletPro: borderRadiusBottomRightTabletPro , borderRadiusBottomRightTabletProLandscape: borderRadiusBottomRightTabletProLandscape , borderRadiusBottomRightDesktop: borderRadiusBottomRightDesktop  } = attr; // for later support of other units
    const appendix = " !important"; // selectors
    let overflowMobile = "";
    if (typeof borderRadiusTopLeftMobile !== "undefined" || typeof borderRadiusTopRightMobile !== "undefined" || typeof borderRadiusBottomLeftMobile !== "undefined" || typeof borderRadiusBottomRightMobile !== "undefined") overflowMobile = "hidden" + appendix;
    const mobile = {
        [wpBlockSelector]: {
            "border-top-left-radius": typeof borderRadiusTopLeftMobile !== "undefined" ? borderRadiusTopLeftMobile + appendix : "",
            "border-top-right-radius": typeof borderRadiusTopRightMobile !== "undefined" ? borderRadiusTopRightMobile + appendix : "",
            "border-bottom-left-radius": typeof borderRadiusBottomLeftMobile !== "undefined" ? borderRadiusBottomLeftMobile + appendix : "",
            "border-bottom-right-radius": typeof borderRadiusBottomRightMobile !== "undefined" ? borderRadiusBottomRightMobile + appendix : "",
            "overflow": overflowMobile
        }
    };
    let overflowMobileLandscape = "";
    if (typeof borderRadiusTopLeftMobileLandscape !== "undefined" || typeof borderRadiusTopRightMobileLandscape !== "undefined" || typeof borderRadiusBottomLeftMobileLandscape !== "undefined" || typeof borderRadiusBottomRightMobileLandscape !== "undefined") overflowMobileLandscape = "hidden" + appendix;
    const mobileLandscape = {
        [wpBlockSelector]: {
            "border-top-left-radius": typeof borderRadiusTopLeftMobileLandscape !== "undefined" ? borderRadiusTopLeftMobileLandscape + appendix : "",
            "border-top-right-radius": typeof borderRadiusTopRightMobileLandscape !== "undefined" ? borderRadiusTopRightMobileLandscape + appendix : "",
            "border-bottom-left-radius": typeof borderRadiusBottomLeftMobileLandscape !== "undefined" ? borderRadiusBottomLeftMobileLandscape + appendix : "",
            "border-bottom-right-radius": typeof borderRadiusBottomRightMobileLandscape !== "undefined" ? borderRadiusBottomRightMobileLandscape + appendix : "",
            "overflow": overflowMobileLandscape
        }
    };
    let overflowTablet = "";
    if (typeof borderRadiusTopLeftTablet !== "undefined" || typeof borderRadiusTopRightTablet !== "undefined" || typeof borderRadiusBottomLeftTablet !== "undefined" || typeof borderRadiusBottomRightTablet !== "undefined") overflowTablet = "hidden" + appendix;
    const tablet = {
        [wpBlockSelector]: {
            "border-top-left-radius": typeof borderRadiusTopLeftTablet !== "undefined" ? borderRadiusTopLeftTablet + appendix : "",
            "border-top-right-radius": typeof borderRadiusTopRightTablet !== "undefined" ? borderRadiusTopRightTablet + appendix : "",
            "border-bottom-left-radius": typeof borderRadiusBottomLeftTablet !== "undefined" ? borderRadiusBottomLeftTablet + appendix : "",
            "border-bottom-right-radius": typeof borderRadiusBottomRightTablet !== "undefined" ? borderRadiusBottomRightTablet + appendix : "",
            "overflow": overflowTablet
        }
    };
    let overflowTabletLandscape = "";
    if (typeof borderRadiusTopLeftTabletLandscape !== "undefined" || typeof borderRadiusTopRightTabletLandscape !== "undefined" || typeof borderRadiusBottomLeftTabletLandscape !== "undefined" || typeof borderRadiusBottomRightTabletLandscape !== "undefined") overflowTabletLandscape = "hidden" + appendix;
    const tabletLandscape = {
        [wpBlockSelector]: {
            "border-top-left-radius": typeof borderRadiusTopLeftTabletLandscape !== "undefined" ? borderRadiusTopLeftTabletLandscape + appendix : "",
            "border-top-right-radius": typeof borderRadiusTopRightTabletLandscape !== "undefined" ? borderRadiusTopRightTabletLandscape + appendix : "",
            "border-bottom-left-radius": typeof borderRadiusBottomLeftTabletLandscape !== "undefined" ? borderRadiusBottomLeftTabletLandscape + appendix : "",
            "border-bottom-right-radius": typeof borderRadiusBottomRightTabletLandscape !== "undefined" ? borderRadiusBottomRightTabletLandscape + appendix : "",
            "overflow": overflowTabletLandscape
        }
    };
    let overflowTabletPro = "";
    if (typeof borderRadiusTopLeftTabletPro !== "undefined" || typeof borderRadiusTopRightTabletPro !== "undefined" || typeof borderRadiusBottomLeftTabletPro !== "undefined" || typeof borderRadiusBottomRightTabletPro !== "undefined") overflowTabletPro = "hidden" + appendix;
    const tabletPro = {
        [wpBlockSelector]: {
            "border-top-left-radius": typeof borderRadiusTopLeftTabletPro !== "undefined" ? borderRadiusTopLeftTabletPro + appendix : "",
            "border-top-right-radius": typeof borderRadiusTopRightTabletPro !== "undefined" ? borderRadiusTopRightTabletPro + appendix : "",
            "border-bottom-left-radius": typeof borderRadiusBottomLeftTabletPro !== "undefined" ? borderRadiusBottomLeftTabletPro + appendix : "",
            "border-bottom-right-radius": typeof borderRadiusBottomRightTabletPro !== "undefined" ? borderRadiusBottomRightTabletPro + appendix : "",
            "overflow": overflowTabletPro
        }
    };
    let overflowTabletProLandscape = "";
    if (typeof borderRadiusTopLeftTabletProLandscape !== "undefined" || typeof borderRadiusTopRightTabletProLandscape !== "undefined" || typeof borderRadiusBottomLeftTabletProLandscape !== "undefined" || typeof borderRadiusBottomRightTabletProLandscape !== "undefined") overflowTabletProLandscape = "hidden" + appendix;
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "border-top-left-radius": typeof borderRadiusTopLeftTabletProLandscape !== "undefined" ? borderRadiusTopLeftTabletProLandscape + appendix : "",
            "border-top-right-radius": typeof borderRadiusTopRightTabletProLandscape !== "undefined" ? borderRadiusTopRightTabletProLandscape + appendix : "",
            "border-bottom-left-radius": typeof borderRadiusBottomLeftTabletProLandscape !== "undefined" ? borderRadiusBottomLeftTabletProLandscape + appendix : "",
            "border-bottom-right-radius": typeof borderRadiusBottomRightTabletProLandscape !== "undefined" ? borderRadiusBottomRightTabletProLandscape + appendix : "",
            "overflow": overflowTabletProLandscape
        }
    };
    let overflowDesktop = "";
    if (typeof borderRadiusTopLeftDesktop !== "undefined" || typeof borderRadiusTopRightDesktop !== "undefined" || typeof borderRadiusBottomLeftDesktop !== "undefined" || typeof borderRadiusBottomRightDesktop !== "undefined") overflowDesktop = "hidden" + appendix;
    const desktop = {
        [wpBlockSelector]: {
            "border-top-left-radius": typeof borderRadiusTopLeftDesktop !== "undefined" ? borderRadiusTopLeftDesktop + appendix : "",
            "border-top-right-radius": typeof borderRadiusTopRightDesktop !== "undefined" ? borderRadiusTopRightDesktop + appendix : "",
            "border-bottom-left-radius": typeof borderRadiusBottomLeftDesktop !== "undefined" ? borderRadiusBottomLeftDesktop + appendix : "",
            "border-bottom-right-radius": typeof borderRadiusBottomRightDesktop !== "undefined" ? borderRadiusBottomRightDesktop + appendix : "",
            "overflow": overflowDesktop
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $d1bc5ef84b2f34b4$export$2e2bcd8739ae039 = $d1bc5ef84b2f34b4$var$EditorStyles;



const { Fragment: $c84270851130dd9f$var$Fragment  } = wp.element;
const { PanelRow: $c84270851130dd9f$var$PanelRow , ToggleControl: $c84270851130dd9f$var$ToggleControl , __experimentalBoxControl: $c84270851130dd9f$var$__experimentalBoxControl  } = wp.components;
const $c84270851130dd9f$var$BoxControl = $c84270851130dd9f$var$__experimentalBoxControl;
const { addFilter: $c84270851130dd9f$var$addFilter  } = wp.hooks;
const { __: $c84270851130dd9f$var$__  } = wp.i18n;
const $c84270851130dd9f$var$_name = "BorderRadius";
const $c84270851130dd9f$var$_prefix = "borderRadius"; // register attributes
const $c84270851130dd9f$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $c84270851130dd9f$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        borderRadiusActive: {
            type: "boolean",
            default: false
        },
        borderRadiusTopLeftMobile: {
            type: "string"
        },
        borderRadiusTopLeftMobileLandscape: {
            type: "string"
        },
        borderRadiusTopLeftTablet: {
            type: "string"
        },
        borderRadiusTopLeftTabletLandscape: {
            type: "string"
        },
        borderRadiusTopLeftTabletPro: {
            type: "string"
        },
        borderRadiusTopLeftTabletProLandscape: {
            type: "string"
        },
        borderRadiusTopLeftDesktop: {
            type: "string"
        },
        borderRadiusTopRightMobile: {
            type: "string"
        },
        borderRadiusTopRightMobileLandscape: {
            type: "string"
        },
        borderRadiusTopRightTablet: {
            type: "string"
        },
        borderRadiusTopRightTabletLandscape: {
            type: "string"
        },
        borderRadiusTopRightTabletPro: {
            type: "string"
        },
        borderRadiusTopRightTabletProLandscape: {
            type: "string"
        },
        borderRadiusTopRightDesktop: {
            type: "string"
        },
        borderRadiusBottomLeftMobile: {
            type: "string"
        },
        borderRadiusBottomLeftMobileLandscape: {
            type: "string"
        },
        borderRadiusBottomLeftTablet: {
            type: "string"
        },
        borderRadiusBottomLeftTabletLandscape: {
            type: "string"
        },
        borderRadiusBottomLeftTabletPro: {
            type: "string"
        },
        borderRadiusBottomLeftTabletProLandscape: {
            type: "string"
        },
        borderRadiusBottomLeftDesktop: {
            type: "string"
        },
        borderRadiusBottomRightMobile: {
            type: "string"
        },
        borderRadiusBottomRightMobileLandscape: {
            type: "string"
        },
        borderRadiusBottomRightTablet: {
            type: "string"
        },
        borderRadiusBottomRightTabletLandscape: {
            type: "string"
        },
        borderRadiusBottomRightTabletPro: {
            type: "string"
        },
        borderRadiusBottomRightTabletProLandscape: {
            type: "string"
        },
        borderRadiusBottomRightDesktop: {
            type: "string"
        }
    });
    return settings;
};
$c84270851130dd9f$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $c84270851130dd9f$var$addCustomControlAttributes); // the component
function $c84270851130dd9f$var$BorderRadius(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $c84270851130dd9f$var$_name)) return /*#__PURE__*/ React.createElement($c84270851130dd9f$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = typeof props.attributes.currentResponsiveTab !== "undefined" ? props.attributes.currentResponsiveTab : "Mobile";
    const boxValues = {
        top: values[$c84270851130dd9f$var$_prefix + "TopLeft" + currentResponsiveTab],
        right: values[$c84270851130dd9f$var$_prefix + "TopRight" + currentResponsiveTab],
        bottom: values[$c84270851130dd9f$var$_prefix + "BottomLeft" + currentResponsiveTab],
        left: values[$c84270851130dd9f$var$_prefix + "BottomRight" + currentResponsiveTab]
    };
    if (values[$c84270851130dd9f$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($c84270851130dd9f$var$Fragment, null, /*#__PURE__*/ React.createElement($c84270851130dd9f$var$ToggleControl, {
        label: $c84270851130dd9f$var$__("Border Radius", "sv100_premium"),
        checked: values[$c84270851130dd9f$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$c84270851130dd9f$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement($c84270851130dd9f$var$PanelRow, null, /*#__PURE__*/ React.createElement($c84270851130dd9f$var$BoxControl, {
        values: boxValues,
        onChange: (values)=>(0, $20b4a97a61b3fccb$export$104514599496d2f5)(values, props, $c84270851130dd9f$var$_name, $c84270851130dd9f$var$_prefix, (0, $d1bc5ef84b2f34b4$export$2e2bcd8739ae039)),
        onUnitChange: (values)=>(0, $20b4a97a61b3fccb$export$104514599496d2f5)(values, props, $c84270851130dd9f$var$_name, $c84270851130dd9f$var$_prefix, (0, $d1bc5ef84b2f34b4$export$2e2bcd8739ae039)),
        allowReset: false,
        label: ""
    })));
    else return /*#__PURE__*/ React.createElement($c84270851130dd9f$var$Fragment, null, /*#__PURE__*/ React.createElement($c84270851130dd9f$var$ToggleControl, {
        label: $c84270851130dd9f$var$__("Border Radius", "sv100_premium"),
        checked: values[$c84270851130dd9f$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$c84270851130dd9f$var$_prefix + "Active"]: val
            })
    }));
}
var $c84270851130dd9f$export$2e2bcd8739ae039 = $c84270851130dd9f$var$BorderRadius;



function $36272fb3372d80bf$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { textAlignMobile: textAlignMobile , textAlignMobileLandscape: textAlignMobileLandscape , textAlignTablet: textAlignTablet , textAlignTabletLandscape: textAlignTabletLandscape , textAlignTabletPro: textAlignTabletPro , textAlignTabletProLandscape: textAlignTabletProLandscape , textAlignDesktop: textAlignDesktop  } = attr; // for later support of other units
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "text-align": textAlignMobile !== "" ? textAlignMobile + appendix : ""
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "text-align": textAlignMobileLandscape !== "" ? textAlignMobileLandscape + appendix : ""
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "text-align": textAlignTablet !== "" ? textAlignTablet + appendix : ""
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "text-align": textAlignTabletLandscape !== "" ? textAlignTabletLandscape + appendix : ""
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "text-align": textAlignTabletPro !== "" ? textAlignTabletPro + appendix : ""
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "text-align": textAlignTabletProLandscape !== "" ? textAlignTabletProLandscape + appendix : ""
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "text-align": textAlignDesktop !== "" ? textAlignDesktop + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $36272fb3372d80bf$export$2e2bcd8739ae039 = $36272fb3372d80bf$var$EditorStyles;



const { Fragment: $52bcc5f70b98ca28$var$Fragment  } = wp.element;
const { PanelRow: $52bcc5f70b98ca28$var$PanelRow , ToggleControl: $52bcc5f70b98ca28$var$ToggleControl , SelectControl: $52bcc5f70b98ca28$var$SelectControl  } = wp.components;
const { addFilter: $52bcc5f70b98ca28$var$addFilter  } = wp.hooks;
const { __: $52bcc5f70b98ca28$var$__  } = wp.i18n;
const $52bcc5f70b98ca28$var$_name = "TextAlign";
const $52bcc5f70b98ca28$var$_prefix = "textAlign"; // register attributes
const $52bcc5f70b98ca28$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $52bcc5f70b98ca28$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        textAlignActive: {
            type: "boolean",
            default: false
        },
        textAlignMobile: {
            type: "string",
            default: ""
        },
        textAlignMobileLandscape: {
            type: "string",
            default: ""
        },
        textAlignTablet: {
            type: "string",
            default: ""
        },
        textAlignTabletLandscape: {
            type: "string",
            default: ""
        },
        textAlignTabletPro: {
            type: "string",
            default: ""
        },
        textAlignTabletProLandscape: {
            type: "string",
            default: ""
        },
        textAlignDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$52bcc5f70b98ca28$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $52bcc5f70b98ca28$var$addCustomControlAttributes); // the component
function $52bcc5f70b98ca28$var$TextAlign(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $52bcc5f70b98ca28$var$_name)) return /*#__PURE__*/ React.createElement($52bcc5f70b98ca28$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    if (values[$52bcc5f70b98ca28$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($52bcc5f70b98ca28$var$Fragment, null, /*#__PURE__*/ React.createElement($52bcc5f70b98ca28$var$ToggleControl, {
        label: $52bcc5f70b98ca28$var$__("Text Alignment", "sv100_premium"),
        checked: values[$52bcc5f70b98ca28$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$52bcc5f70b98ca28$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement($52bcc5f70b98ca28$var$PanelRow, null, /*#__PURE__*/ React.createElement($52bcc5f70b98ca28$var$SelectControl, {
        value: values[$52bcc5f70b98ca28$var$_prefix + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $52bcc5f70b98ca28$var$_name, $52bcc5f70b98ca28$var$_prefix, (0, $36272fb3372d80bf$export$2e2bcd8739ae039));
        },
        options: [
            {
                value: "",
                label: "Select"
            },
            {
                value: "center",
                label: "Center"
            },
            {
                value: "left",
                label: "Left"
            },
            {
                value: "right",
                label: "Right"
            }
        ]
    })));
    else return /*#__PURE__*/ React.createElement($52bcc5f70b98ca28$var$Fragment, null, /*#__PURE__*/ React.createElement($52bcc5f70b98ca28$var$ToggleControl, {
        label: $52bcc5f70b98ca28$var$__("Text Alignment", "sv100_premium"),
        checked: values[$52bcc5f70b98ca28$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$52bcc5f70b98ca28$var$_prefix + "Active"]: val
            })
    }));
}
var $52bcc5f70b98ca28$export$2e2bcd8739ae039 = $52bcc5f70b98ca28$var$TextAlign;



function $bec073452d2217cc$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { fontSizeMobile: fontSizeMobile , fontSizeMobileLandscape: fontSizeMobileLandscape , fontSizeTablet: fontSizeTablet , fontSizeTabletLandscape: fontSizeTabletLandscape , fontSizeTabletPro: fontSizeTabletPro , fontSizeTabletProLandscape: fontSizeTabletProLandscape , fontSizeDesktop: fontSizeDesktop  } = attr; // for later support of other units
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "font-size": fontSizeMobile !== "" ? fontSizeMobile + appendix : ""
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "font-size": fontSizeMobileLandscape !== "" ? fontSizeMobileLandscape + appendix : ""
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "font-size": fontSizeTablet !== "" ? fontSizeTablet + appendix : ""
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "font-size": fontSizeTabletLandscape !== "" ? fontSizeTabletLandscape + appendix : ""
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "font-size": fontSizeTabletPro !== "" ? fontSizeTabletPro + appendix : ""
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "font-size": fontSizeTabletProLandscape !== "" ? fontSizeTabletProLandscape + appendix : ""
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "font-size": fontSizeDesktop !== "" ? fontSizeDesktop + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $bec073452d2217cc$export$2e2bcd8739ae039 = $bec073452d2217cc$var$EditorStyles;



const { Fragment: $1d7aa8fe3c1ca839$var$Fragment  } = wp.element;
const { PanelRow: $1d7aa8fe3c1ca839$var$PanelRow , ToggleControl: $1d7aa8fe3c1ca839$var$ToggleControl , __experimentalUnitControl: $1d7aa8fe3c1ca839$var$__experimentalUnitControl  } = wp.components;
const $1d7aa8fe3c1ca839$var$UnitControl = $1d7aa8fe3c1ca839$var$__experimentalUnitControl;
const { addFilter: $1d7aa8fe3c1ca839$var$addFilter  } = wp.hooks;
const { __: $1d7aa8fe3c1ca839$var$__  } = wp.i18n;
const $1d7aa8fe3c1ca839$var$_name = "FontSize";
const $1d7aa8fe3c1ca839$var$_prefix = "fontSize"; // register attributes
const $1d7aa8fe3c1ca839$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $1d7aa8fe3c1ca839$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        fontSizeActive: {
            type: "boolean",
            default: false
        },
        fontSizeMobile: {
            type: "string",
            default: ""
        },
        fontSizeMobileLandscape: {
            type: "string",
            default: ""
        },
        fontSizeTablet: {
            type: "string",
            default: ""
        },
        fontSizeTabletLandscape: {
            type: "string",
            default: ""
        },
        fontSizeTabletPro: {
            type: "string",
            default: ""
        },
        fontSizeTabletProLandscape: {
            type: "string",
            default: ""
        },
        fontSizeDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$1d7aa8fe3c1ca839$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $1d7aa8fe3c1ca839$var$addCustomControlAttributes); // the component
function $1d7aa8fe3c1ca839$var$FontSize(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $1d7aa8fe3c1ca839$var$_name)) return /*#__PURE__*/ React.createElement($1d7aa8fe3c1ca839$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    if (values[$1d7aa8fe3c1ca839$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($1d7aa8fe3c1ca839$var$Fragment, null, /*#__PURE__*/ React.createElement($1d7aa8fe3c1ca839$var$ToggleControl, {
        label: $1d7aa8fe3c1ca839$var$__("Font Size", "sv100_premium"),
        checked: values[$1d7aa8fe3c1ca839$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$1d7aa8fe3c1ca839$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement($1d7aa8fe3c1ca839$var$PanelRow, null, /*#__PURE__*/ React.createElement($1d7aa8fe3c1ca839$var$UnitControl, {
        value: values[$1d7aa8fe3c1ca839$var$_prefix + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $1d7aa8fe3c1ca839$var$_name, $1d7aa8fe3c1ca839$var$_prefix, (0, $bec073452d2217cc$export$2e2bcd8739ae039));
        },
        onUnitChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $1d7aa8fe3c1ca839$var$_name, $1d7aa8fe3c1ca839$var$_prefix, (0, $bec073452d2217cc$export$2e2bcd8739ae039));
        }
    })));
    else return /*#__PURE__*/ React.createElement($1d7aa8fe3c1ca839$var$Fragment, null, /*#__PURE__*/ React.createElement($1d7aa8fe3c1ca839$var$ToggleControl, {
        label: $1d7aa8fe3c1ca839$var$__("Font Size", "sv100_premium"),
        checked: values[$1d7aa8fe3c1ca839$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$1d7aa8fe3c1ca839$var$_prefix + "Active"]: val
            })
    }));
}
var $1d7aa8fe3c1ca839$export$2e2bcd8739ae039 = $1d7aa8fe3c1ca839$var$FontSize;



function $f278226ab3bd2e4e$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { lineHeightMobile: lineHeightMobile , lineHeightMobileLandscape: lineHeightMobileLandscape , lineHeightTablet: lineHeightTablet , lineHeightTabletLandscape: lineHeightTabletLandscape , lineHeightTabletPro: lineHeightTabletPro , lineHeightTabletProLandscape: lineHeightTabletProLandscape , lineHeightDesktop: lineHeightDesktop  } = attr; // for later support of other units
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "line-height": lineHeightMobile !== "" ? lineHeightMobile + appendix : ""
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "line-height": lineHeightMobileLandscape !== "" ? lineHeightMobileLandscape + appendix : ""
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "line-height": lineHeightTablet !== "" ? lineHeightTablet + appendix : ""
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "line-height": lineHeightTabletLandscape !== "" ? lineHeightTabletLandscape + appendix : ""
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "line-height": lineHeightTabletPro !== "" ? lineHeightTabletPro + appendix : ""
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "line-height": lineHeightTabletProLandscape !== "" ? lineHeightTabletProLandscape + appendix : ""
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "line-height": lineHeightDesktop !== "" ? lineHeightDesktop + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $f278226ab3bd2e4e$export$2e2bcd8739ae039 = $f278226ab3bd2e4e$var$EditorStyles;



const { Fragment: $acb3993e69d69dd8$var$Fragment  } = wp.element;
const { PanelRow: $acb3993e69d69dd8$var$PanelRow , ToggleControl: $acb3993e69d69dd8$var$ToggleControl , __experimentalUnitControl: $acb3993e69d69dd8$var$__experimentalUnitControl  } = wp.components;
const $acb3993e69d69dd8$var$UnitControl = $acb3993e69d69dd8$var$__experimentalUnitControl;
const { addFilter: $acb3993e69d69dd8$var$addFilter  } = wp.hooks;
const { __: $acb3993e69d69dd8$var$__  } = wp.i18n;
const $acb3993e69d69dd8$var$_name = "LineHeight";
const $acb3993e69d69dd8$var$_prefix = "lineHeight"; // register attributes
const $acb3993e69d69dd8$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $acb3993e69d69dd8$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        lineHeightActive: {
            type: "boolean",
            default: false
        },
        lineHeightMobile: {
            type: "string",
            default: ""
        },
        lineHeightMobileLandscape: {
            type: "string",
            default: ""
        },
        lineHeightTablet: {
            type: "string",
            default: ""
        },
        lineHeightTabletLandscape: {
            type: "string",
            default: ""
        },
        lineHeightTabletPro: {
            type: "string",
            default: ""
        },
        lineHeightTabletProLandscape: {
            type: "string",
            default: ""
        },
        lineHeightDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$acb3993e69d69dd8$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $acb3993e69d69dd8$var$addCustomControlAttributes); // the component
function $acb3993e69d69dd8$var$LineHeight(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $acb3993e69d69dd8$var$_name)) return /*#__PURE__*/ React.createElement($acb3993e69d69dd8$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    if (values[$acb3993e69d69dd8$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($acb3993e69d69dd8$var$Fragment, null, /*#__PURE__*/ React.createElement($acb3993e69d69dd8$var$ToggleControl, {
        label: $acb3993e69d69dd8$var$__("Line Height", "sv100_premium"),
        checked: values[$acb3993e69d69dd8$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$acb3993e69d69dd8$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement($acb3993e69d69dd8$var$PanelRow, null, /*#__PURE__*/ React.createElement($acb3993e69d69dd8$var$UnitControl, {
        value: values[$acb3993e69d69dd8$var$_prefix + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $acb3993e69d69dd8$var$_name, $acb3993e69d69dd8$var$_prefix, (0, $f278226ab3bd2e4e$export$2e2bcd8739ae039));
        },
        onUnitChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $acb3993e69d69dd8$var$_name, $acb3993e69d69dd8$var$_prefix, (0, $f278226ab3bd2e4e$export$2e2bcd8739ae039));
        }
    })));
    else return /*#__PURE__*/ React.createElement($acb3993e69d69dd8$var$Fragment, null, /*#__PURE__*/ React.createElement($acb3993e69d69dd8$var$ToggleControl, {
        label: $acb3993e69d69dd8$var$__("Line Height", "sv100_premium"),
        checked: values[$acb3993e69d69dd8$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$acb3993e69d69dd8$var$_prefix + "Active"]: val
            })
    }));
}
var $acb3993e69d69dd8$export$2e2bcd8739ae039 = $acb3993e69d69dd8$var$LineHeight;



function $6bd75396e7116d83$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { hyphensMobile: hyphensMobile , hyphensMobileLandscape: hyphensMobileLandscape , hyphensTablet: hyphensTablet , hyphensTabletLandscape: hyphensTabletLandscape , hyphensTabletPro: hyphensTabletPro , hyphensTabletProLandscape: hyphensTabletProLandscape , hyphensDesktop: hyphensDesktop  } = attr; // for later support of other units
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "hyphens": hyphensMobile !== "" ? hyphensMobile + appendix : ""
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "hyphens": hyphensMobileLandscape !== "" ? hyphensMobileLandscape + appendix : ""
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "hyphens": hyphensTablet !== "" ? hyphensTablet + appendix : ""
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "hyphens": hyphensTabletLandscape !== "" ? hyphensTabletLandscape + appendix : ""
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "hyphens": hyphensTabletPro !== "" ? hyphensTabletPro + appendix : ""
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "hyphens": hyphensTabletProLandscape !== "" ? hyphensTabletProLandscape + appendix : ""
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "hyphens": hyphensDesktop !== "" ? hyphensDesktop + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $6bd75396e7116d83$export$2e2bcd8739ae039 = $6bd75396e7116d83$var$EditorStyles;



const { Fragment: $c058877659a10122$var$Fragment  } = wp.element;
const { PanelRow: $c058877659a10122$var$PanelRow , ToggleControl: $c058877659a10122$var$ToggleControl , SelectControl: $c058877659a10122$var$SelectControl  } = wp.components;
const { addFilter: $c058877659a10122$var$addFilter  } = wp.hooks;
const { __: $c058877659a10122$var$__  } = wp.i18n;
const $c058877659a10122$var$_name = "Hyphens";
const $c058877659a10122$var$_prefix = "hyphens"; // register attributes
const $c058877659a10122$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $c058877659a10122$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        hyphensActive: {
            type: "boolean",
            default: false
        },
        hyphensMobile: {
            type: "string",
            default: ""
        },
        hyphensMobileLandscape: {
            type: "string",
            default: ""
        },
        hyphensTablet: {
            type: "string",
            default: ""
        },
        hyphensTabletLandscape: {
            type: "string",
            default: ""
        },
        hyphensTabletPro: {
            type: "string",
            default: ""
        },
        hyphensTabletProLandscape: {
            type: "string",
            default: ""
        },
        hyphensDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$c058877659a10122$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $c058877659a10122$var$addCustomControlAttributes); // the component
function $c058877659a10122$var$Hyphens(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $c058877659a10122$var$_name)) return /*#__PURE__*/ React.createElement($c058877659a10122$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    if (values[$c058877659a10122$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($c058877659a10122$var$Fragment, null, /*#__PURE__*/ React.createElement($c058877659a10122$var$ToggleControl, {
        label: $c058877659a10122$var$__("Hyphens", "sv100_premium"),
        checked: values[$c058877659a10122$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$c058877659a10122$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement($c058877659a10122$var$PanelRow, null, /*#__PURE__*/ React.createElement($c058877659a10122$var$SelectControl, {
        value: values[$c058877659a10122$var$_prefix + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $c058877659a10122$var$_name, $c058877659a10122$var$_prefix, (0, $6bd75396e7116d83$export$2e2bcd8739ae039));
        },
        options: [
            {
                value: "",
                label: "Select"
            },
            {
                value: "none",
                label: "None"
            },
            {
                value: "manual",
                label: "Manual"
            },
            {
                value: "auto",
                label: "Auto"
            },
            {
                value: "inherit",
                label: "Inherit"
            }
        ]
    })));
    else return /*#__PURE__*/ React.createElement($c058877659a10122$var$Fragment, null, /*#__PURE__*/ React.createElement($c058877659a10122$var$ToggleControl, {
        label: $c058877659a10122$var$__("Hyphens", "sv100_premium"),
        checked: values[$c058877659a10122$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$c058877659a10122$var$_prefix + "Active"]: val
            })
    }));
}
var $c058877659a10122$export$2e2bcd8739ae039 = $c058877659a10122$var$Hyphens;



function $881f9e4fbc2ffce4$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { heightMobile: heightMobile , heightMobileLandscape: heightMobileLandscape , heightTablet: heightTablet , heightTabletLandscape: heightTabletLandscape , heightTabletPro: heightTabletPro , heightTabletProLandscape: heightTabletProLandscape , heightDesktop: heightDesktop , heightMinMobile: heightMinMobile , heightMinMobileLandscape: heightMinMobileLandscape , heightMinTablet: heightMinTablet , heightMinTabletLandscape: heightMinTabletLandscape , heightMinTabletPro: heightMinTabletPro , heightMinTabletProLandscape: heightMinTabletProLandscape , heightMinDesktop: heightMinDesktop , heightMaxMobile: heightMaxMobile , heightMaxMobileLandscape: heightMaxMobileLandscape , heightMaxTablet: heightMaxTablet , heightMaxTabletLandscape: heightMaxTabletLandscape , heightMaxTabletPro: heightMaxTabletPro , heightMaxTabletProLandscape: heightMaxTabletProLandscape , heightMaxDesktop: heightMaxDesktop  } = attr; // for later support of other units
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "height": heightMobile !== "" ? heightMobile + appendix : "",
            "min-height": heightMinMobile !== "" ? heightMinMobile + appendix : "",
            "max-height": heightMaxMobile !== "" ? heightMaxMobile + appendix : ""
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "height": heightMobileLandscape !== "" ? heightMobileLandscape + appendix : "",
            "min-height": heightMinMobileLandscape !== "" ? heightMinMobileLandscape + appendix : "",
            "max-height": heightMaxMobileLandscape !== "" ? heightMaxMobileLandscape + appendix : ""
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "height": heightTablet !== "" ? heightTablet + appendix : "",
            "min-height": heightMinTablet !== "" ? heightMinTablet + appendix : "",
            "max-height": heightMaxTablet !== "" ? heightMaxTablet + appendix : ""
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "height": heightTabletLandscape !== "" ? heightTabletLandscape + appendix : "",
            "min-height": heightMinTabletLandscape !== "" ? heightMinTabletLandscape + appendix : "",
            "max-height": heightMaxTabletLandscape !== "" ? heightMaxTabletLandscape + appendix : ""
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "height": heightTabletPro !== "" ? heightTabletPro + appendix : "",
            "min-height": heightMinTabletPro !== "" ? heightMinTabletPro + appendix : "",
            "max-height": heightMaxTabletPro !== "" ? heightMaxTabletPro + appendix : ""
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "height": heightTabletProLandscape !== "" ? heightTabletProLandscape + appendix : "",
            "min-height": heightMinTabletProLandscape !== "" ? heightMinTabletProLandscape + appendix : "",
            "max-height": heightMaxTabletProLandscape !== "" ? heightMaxTabletProLandscape + appendix : ""
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "height": heightDesktop !== "" ? heightDesktop + appendix : "",
            "min-height": heightMinDesktop !== "" ? heightMinDesktop + appendix : "",
            "max-height": heightMaxDesktop !== "" ? heightMaxDesktop + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $881f9e4fbc2ffce4$export$2e2bcd8739ae039 = $881f9e4fbc2ffce4$var$EditorStyles;



const { Fragment: $968264db4d4c9c24$var$Fragment  } = wp.element;
const { PanelBody: $968264db4d4c9c24$var$PanelBody , PanelRow: $968264db4d4c9c24$var$PanelRow , ToggleControl: $968264db4d4c9c24$var$ToggleControl , __experimentalUnitControl: $968264db4d4c9c24$var$__experimentalUnitControl  } = wp.components;
const $968264db4d4c9c24$var$UnitControl = $968264db4d4c9c24$var$__experimentalUnitControl;
const { addFilter: $968264db4d4c9c24$var$addFilter  } = wp.hooks;
const { __: $968264db4d4c9c24$var$__  } = wp.i18n;
const $968264db4d4c9c24$var$_name = "Height";
const $968264db4d4c9c24$var$_prefix = "height"; // register attributes
const $968264db4d4c9c24$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $968264db4d4c9c24$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        heightActive: {
            type: "boolean",
            default: false
        },
        heightMobile: {
            type: "string",
            default: ""
        },
        heightMobileLandscape: {
            type: "string",
            default: ""
        },
        heightTablet: {
            type: "string",
            default: ""
        },
        heightTabletLandscape: {
            type: "string",
            default: ""
        },
        heightTabletPro: {
            type: "string",
            default: ""
        },
        heightTabletProLandscape: {
            type: "string",
            default: ""
        },
        heightDesktop: {
            type: "string",
            default: ""
        },
        heightMinMobile: {
            type: "string",
            default: ""
        },
        heightMinMobileLandscape: {
            type: "string",
            default: ""
        },
        heightMinTablet: {
            type: "string",
            default: ""
        },
        heightMinTabletLandscape: {
            type: "string",
            default: ""
        },
        heightMinTabletPro: {
            type: "string",
            default: ""
        },
        heightMinTabletProLandscape: {
            type: "string",
            default: ""
        },
        heightMinDesktop: {
            type: "string",
            default: ""
        },
        heightMaxMobile: {
            type: "string",
            default: ""
        },
        heightMaxMobileLandscape: {
            type: "string",
            default: ""
        },
        heightMaxTablet: {
            type: "string",
            default: ""
        },
        heightMaxTabletLandscape: {
            type: "string",
            default: ""
        },
        heightMaxTabletPro: {
            type: "string",
            default: ""
        },
        heightMaxTabletProLandscape: {
            type: "string",
            default: ""
        },
        heightMaxDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$968264db4d4c9c24$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $968264db4d4c9c24$var$addCustomControlAttributes); // the component
function $968264db4d4c9c24$var$Height(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $968264db4d4c9c24$var$_name)) return /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    if (values[$968264db4d4c9c24$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$Fragment, null, /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$ToggleControl, {
        label: $968264db4d4c9c24$var$__("Height", "sv100_premium"),
        checked: values[$968264db4d4c9c24$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$968264db4d4c9c24$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$PanelBody, null, /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$PanelRow, null, /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$UnitControl, {
        label: $968264db4d4c9c24$var$__("Val", "sv100_premium"),
        labelPosition: "side",
        value: values[$968264db4d4c9c24$var$_prefix + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $968264db4d4c9c24$var$_name, $968264db4d4c9c24$var$_prefix, (0, $881f9e4fbc2ffce4$export$2e2bcd8739ae039));
        },
        onUnitChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $968264db4d4c9c24$var$_name, $968264db4d4c9c24$var$_prefix, (0, $881f9e4fbc2ffce4$export$2e2bcd8739ae039));
        }
    })), /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$PanelRow, null, /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$UnitControl, {
        label: $968264db4d4c9c24$var$__("Min", "sv100_premium"),
        labelPosition: "side",
        value: values[$968264db4d4c9c24$var$_prefix + "Min" + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $968264db4d4c9c24$var$_name, $968264db4d4c9c24$var$_prefix + "Min", (0, $881f9e4fbc2ffce4$export$2e2bcd8739ae039));
        },
        onUnitChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $968264db4d4c9c24$var$_name, $968264db4d4c9c24$var$_prefix + "Min", (0, $881f9e4fbc2ffce4$export$2e2bcd8739ae039));
        }
    })), /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$PanelRow, null, /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$UnitControl, {
        label: $968264db4d4c9c24$var$__("Max", "sv100_premium"),
        labelPosition: "side",
        value: values[$968264db4d4c9c24$var$_prefix + "Max" + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $968264db4d4c9c24$var$_name, $968264db4d4c9c24$var$_prefix + "Max", (0, $881f9e4fbc2ffce4$export$2e2bcd8739ae039));
        },
        onUnitChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $968264db4d4c9c24$var$_name, $968264db4d4c9c24$var$_prefix + "Max", (0, $881f9e4fbc2ffce4$export$2e2bcd8739ae039));
        }
    }))));
    else return /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$Fragment, null, /*#__PURE__*/ React.createElement($968264db4d4c9c24$var$ToggleControl, {
        label: $968264db4d4c9c24$var$__("Height", "sv100_premium"),
        checked: values[$968264db4d4c9c24$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$968264db4d4c9c24$var$_prefix + "Active"]: val
            })
    }));
}
var $968264db4d4c9c24$export$2e2bcd8739ae039 = $968264db4d4c9c24$var$Height;



function $e7f421b9fb7a0b64$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { widthMobile: widthMobile , widthMobileLandscape: widthMobileLandscape , widthTablet: widthTablet , widthTabletLandscape: widthTabletLandscape , widthTabletPro: widthTabletPro , widthTabletProLandscape: widthTabletProLandscape , widthDesktop: widthDesktop , widthMinMobile: widthMinMobile , widthMinMobileLandscape: widthMinMobileLandscape , widthMinTablet: widthMinTablet , widthMinTabletLandscape: widthMinTabletLandscape , widthMinTabletPro: widthMinTabletPro , widthMinTabletProLandscape: widthMinTabletProLandscape , widthMinDesktop: widthMinDesktop , widthMaxMobile: widthMaxMobile , widthMaxMobileLandscape: widthMaxMobileLandscape , widthMaxTablet: widthMaxTablet , widthMaxTabletLandscape: widthMaxTabletLandscape , widthMaxTabletPro: widthMaxTabletPro , widthMaxTabletProLandscape: widthMaxTabletProLandscape , widthMaxDesktop: widthMaxDesktop  } = attr; // for later support of other units
    const appendix = " !important"; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "width": widthMobile !== "" ? widthMobile + appendix : "",
            "min-width": widthMinMobile !== "" ? widthMinMobile + appendix : "",
            "max-width": widthMaxMobile !== "" ? widthMaxMobile + appendix : ""
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "width": widthMobileLandscape !== "" ? widthMobileLandscape + appendix : "",
            "min-width": widthMinMobileLandscape !== "" ? widthMinMobileLandscape + appendix : "",
            "max-width": widthMaxMobileLandscape !== "" ? widthMaxMobileLandscape + appendix : ""
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "width": widthTablet !== "" ? widthTablet + appendix : "",
            "min-width": widthMinTablet !== "" ? widthMinTablet + appendix : "",
            "max-width": widthMaxTablet !== "" ? widthMaxTablet + appendix : ""
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "width": widthTabletLandscape !== "" ? widthTabletLandscape + appendix : "",
            "min-width": widthMinTabletLandscape !== "" ? widthMinTabletLandscape + appendix : "",
            "max-width": widthMaxTabletLandscape !== "" ? widthMaxTabletLandscape + appendix : ""
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "width": widthTabletPro !== "" ? widthTabletPro + appendix : "",
            "min-width": widthMinTabletPro !== "" ? widthMinTabletPro + appendix : "",
            "max-width": widthMaxTabletPro !== "" ? widthMaxTabletPro + appendix : ""
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "width": widthTabletProLandscape !== "" ? widthTabletProLandscape + appendix : "",
            "min-width": widthMinTabletProLandscape !== "" ? widthMinTabletProLandscape + appendix : "",
            "max-width": widthMaxTabletProLandscape !== "" ? widthMaxTabletProLandscape + appendix : ""
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "width": widthDesktop !== "" ? widthDesktop + appendix : "",
            "min-width": widthMinDesktop !== "" ? widthMinDesktop + appendix : "",
            "max-width": widthMaxDesktop !== "" ? widthMaxDesktop + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $e7f421b9fb7a0b64$export$2e2bcd8739ae039 = $e7f421b9fb7a0b64$var$EditorStyles;



const { Fragment: $a28ac75086a0692d$var$Fragment  } = wp.element;
const { PanelBody: $a28ac75086a0692d$var$PanelBody , PanelRow: $a28ac75086a0692d$var$PanelRow , ToggleControl: $a28ac75086a0692d$var$ToggleControl , __experimentalUnitControl: $a28ac75086a0692d$var$__experimentalUnitControl  } = wp.components;
const $a28ac75086a0692d$var$UnitControl = $a28ac75086a0692d$var$__experimentalUnitControl;
const { addFilter: $a28ac75086a0692d$var$addFilter  } = wp.hooks;
const { __: $a28ac75086a0692d$var$__  } = wp.i18n;
const $a28ac75086a0692d$var$_name = "Width";
const $a28ac75086a0692d$var$_prefix = "width"; // register attributes
const $a28ac75086a0692d$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $a28ac75086a0692d$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        widthActive: {
            type: "boolean",
            default: false
        },
        widthMobile: {
            type: "string",
            default: ""
        },
        widthMobileLandscape: {
            type: "string",
            default: ""
        },
        widthTablet: {
            type: "string",
            default: ""
        },
        widthTabletLandscape: {
            type: "string",
            default: ""
        },
        widthTabletPro: {
            type: "string",
            default: ""
        },
        widthTabletProLandscape: {
            type: "string",
            default: ""
        },
        widthDesktop: {
            type: "string",
            default: ""
        },
        widthMinMobile: {
            type: "string",
            default: ""
        },
        widthMinMobileLandscape: {
            type: "string",
            default: ""
        },
        widthMinTablet: {
            type: "string",
            default: ""
        },
        widthMinTabletLandscape: {
            type: "string",
            default: ""
        },
        widthMinTabletPro: {
            type: "string",
            default: ""
        },
        widthMinTabletProLandscape: {
            type: "string",
            default: ""
        },
        widthMinDesktop: {
            type: "string",
            default: ""
        },
        widthMaxMobile: {
            type: "string",
            default: ""
        },
        widthMaxMobileLandscape: {
            type: "string",
            default: ""
        },
        widthMaxTablet: {
            type: "string",
            default: ""
        },
        widthMaxTabletLandscape: {
            type: "string",
            default: ""
        },
        widthMaxTabletPro: {
            type: "string",
            default: ""
        },
        widthMaxTabletProLandscape: {
            type: "string",
            default: ""
        },
        widthMaxDesktop: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$a28ac75086a0692d$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $a28ac75086a0692d$var$addCustomControlAttributes); // the component
function $a28ac75086a0692d$var$Width(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $a28ac75086a0692d$var$_name)) return /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    if (values[$a28ac75086a0692d$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$Fragment, null, /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$ToggleControl, {
        label: $a28ac75086a0692d$var$__("Width", "sv100_premium"),
        checked: values[$a28ac75086a0692d$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$a28ac75086a0692d$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$PanelBody, null, /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$PanelRow, null, /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$UnitControl, {
        label: $a28ac75086a0692d$var$__("Val", "sv100_premium"),
        labelPosition: "side",
        value: values[$a28ac75086a0692d$var$_prefix + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $a28ac75086a0692d$var$_name, $a28ac75086a0692d$var$_prefix, (0, $e7f421b9fb7a0b64$export$2e2bcd8739ae039));
        },
        onUnitChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $a28ac75086a0692d$var$_name, $a28ac75086a0692d$var$_prefix, (0, $e7f421b9fb7a0b64$export$2e2bcd8739ae039));
        }
    })), /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$PanelRow, null, /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$UnitControl, {
        label: $a28ac75086a0692d$var$__("Min", "sv100_premium"),
        labelPosition: "side",
        value: values[$a28ac75086a0692d$var$_prefix + "Min" + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $a28ac75086a0692d$var$_name, $a28ac75086a0692d$var$_prefix + "Min", (0, $e7f421b9fb7a0b64$export$2e2bcd8739ae039));
        },
        onUnitChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $a28ac75086a0692d$var$_name, $a28ac75086a0692d$var$_prefix + "Min", (0, $e7f421b9fb7a0b64$export$2e2bcd8739ae039));
        }
    })), /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$PanelRow, null, /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$UnitControl, {
        label: $a28ac75086a0692d$var$__("Max", "sv100_premium"),
        labelPosition: "side",
        value: values[$a28ac75086a0692d$var$_prefix + "Max" + currentResponsiveTab],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $a28ac75086a0692d$var$_name, $a28ac75086a0692d$var$_prefix + "Max", (0, $e7f421b9fb7a0b64$export$2e2bcd8739ae039));
        },
        onUnitChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $a28ac75086a0692d$var$_name, $a28ac75086a0692d$var$_prefix + "Max", (0, $e7f421b9fb7a0b64$export$2e2bcd8739ae039));
        }
    }))));
    else return /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$Fragment, null, /*#__PURE__*/ React.createElement($a28ac75086a0692d$var$ToggleControl, {
        label: $a28ac75086a0692d$var$__("Width", "sv100_premium"),
        checked: values[$a28ac75086a0692d$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$a28ac75086a0692d$var$_prefix + "Active"]: val
            })
    }));
}
var $a28ac75086a0692d$export$2e2bcd8739ae039 = $a28ac75086a0692d$var$Width;



const { Fragment: $9ef137adafc372fe$var$Fragment  } = wp.element;
const { ToggleControl: $9ef137adafc372fe$var$ToggleControl , PanelRow: $9ef137adafc372fe$var$PanelRow , __experimentalInputControl: $9ef137adafc372fe$var$InputControl  } = wp.components;
const { __experimentalLinkControl: $9ef137adafc372fe$var$LinkControl  } = wp.blockEditor;
const { addFilter: $9ef137adafc372fe$var$addFilter  } = wp.hooks;
const { __: $9ef137adafc372fe$var$__  } = wp.i18n;
const $9ef137adafc372fe$var$_name = "StretchLink";
const $9ef137adafc372fe$var$_prefix = "stretchLink"; // register attributes
const $9ef137adafc372fe$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $9ef137adafc372fe$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        stretchLink: {
            type: "boolean",
            default: false
        },
        stretchLinkURL: {
            type: "string",
            default: ""
        },
        stretchLinkTitle: {
            type: "string",
            default: ""
        },
        stretchLinkNewTab: {
            type: "boolean",
            default: false
        },
        stretchLinkID: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$9ef137adafc372fe$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $9ef137adafc372fe$var$addCustomControlAttributes); // the component
function $9ef137adafc372fe$var$StretchLink(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $9ef137adafc372fe$var$_name)) return /*#__PURE__*/ React.createElement($9ef137adafc372fe$var$Fragment, null);
    const values = props.attributes;
    let linkControlValues = {
        url: values.stretchLinkURL,
        title: values.stretchLinkTitle,
        opensInNewTab: values.stretchLinkNewTab
    };
    if (values[$9ef137adafc372fe$var$_prefix] === true) return /*#__PURE__*/ React.createElement($9ef137adafc372fe$var$Fragment, null, /*#__PURE__*/ React.createElement($9ef137adafc372fe$var$ToggleControl, {
        label: $9ef137adafc372fe$var$__("StretchLink", "sv100_premium"),
        value: values[$9ef137adafc372fe$var$_prefix],
        checked: values[$9ef137adafc372fe$var$_prefix],
        onChange: (val)=>props.setAttributes({
                stretchLink: val
            })
    }), /*#__PURE__*/ React.createElement($9ef137adafc372fe$var$PanelRow, null, /*#__PURE__*/ React.createElement($9ef137adafc372fe$var$LinkControl, {
        value: linkControlValues,
        onChange: (val)=>props.setAttributes({
                stretchLinkURL: val.url,
                stretchLinkTitle: val.title,
                stretchLinkNewTab: val.opensInNewTab
            }),
        onRemove: (val)=>props.setAttributes({
                stretchLinkURL: "",
                stretchLinkTitle: "",
                stretchLinkNewTab: val.opensInNewTab
            })
    })), /*#__PURE__*/ React.createElement($9ef137adafc372fe$var$PanelRow, null, /*#__PURE__*/ React.createElement($9ef137adafc372fe$var$InputControl, {
        label: $9ef137adafc372fe$var$__("Link HTML-Anchor", "sv100_premium"),
        onChange: (val)=>props.setAttributes({
                stretchLinkID: val
            })
    })));
    else return /*#__PURE__*/ React.createElement($9ef137adafc372fe$var$Fragment, null, /*#__PURE__*/ React.createElement($9ef137adafc372fe$var$ToggleControl, {
        label: $9ef137adafc372fe$var$__("StretchLink", "sv100_premium"),
        value: values[$9ef137adafc372fe$var$_prefix],
        checked: props.attributes[$9ef137adafc372fe$var$_prefix],
        onChange: (val)=>props.setAttributes({
                stretchLink: val
            })
    }));
}
var $9ef137adafc372fe$export$2e2bcd8739ae039 = $9ef137adafc372fe$var$StretchLink;



const { Fragment: $a3d9eb5afbc57189$var$Fragment  } = wp.element;
const { PanelRow: $a3d9eb5afbc57189$var$PanelRow , ToggleControl: $a3d9eb5afbc57189$var$ToggleControl , Button: $a3d9eb5afbc57189$var$Button , BaseControl: $a3d9eb5afbc57189$var$BaseControl  } = wp.components;
const { MediaPlaceholder: $a3d9eb5afbc57189$var$MediaPlaceholder , MediaUpload: $a3d9eb5afbc57189$var$MediaUpload , MediaUploadCheck: $a3d9eb5afbc57189$var$MediaUploadCheck , MediaReplaceFlow: $a3d9eb5afbc57189$var$MediaReplaceFlow  } = wp.blockEditor;
const { useRef: $a3d9eb5afbc57189$var$useRef , useEffect: $a3d9eb5afbc57189$var$useEffect  } = wp.element;
const { addFilter: $a3d9eb5afbc57189$var$addFilter  } = wp.hooks;
const { __: $a3d9eb5afbc57189$var$__  } = wp.i18n;
const $a3d9eb5afbc57189$var$_name = "PosterImage";
const $a3d9eb5afbc57189$var$_prefix = "posterImage"; // register attributes
const $a3d9eb5afbc57189$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $a3d9eb5afbc57189$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        posterImage: {
            type: "boolean",
            default: false
        },
        posterImageURL: {
            type: "string",
            default: ""
        }
    });
    return settings;
};
$a3d9eb5afbc57189$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $a3d9eb5afbc57189$var$addCustomControlAttributes); // the component
function $a3d9eb5afbc57189$var$PosterImage(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $a3d9eb5afbc57189$var$_name)) return /*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$Fragment, null);
    const values = props.attributes;
    const posterImageButton = $a3d9eb5afbc57189$var$useRef();
    const videoPosterDescription = `video-block__poster-image-description-${values.blockId}`;
    const _document = (0, $20b4a97a61b3fccb$export$181eafda0ca2b0bb)(props);
    const videoChild = _document.querySelector(".sv100-premium-block-core-" + values.blockId + " video"); // set / remove poster from block editor video block
    if (videoChild !== null && values.posterImageURL !== "") videoChild.setAttribute("poster", values.posterImageURL);
    if (videoChild !== null && values.posterImageURL === "") videoChild.removeAttribute("poster");
    if (values[$a3d9eb5afbc57189$var$_prefix] === true) return /*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$Fragment, null, /*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$ToggleControl, {
        label: $a3d9eb5afbc57189$var$__("Poster Image", "sv100_premium"),
        value: values[$a3d9eb5afbc57189$var$_prefix],
        checked: values[$a3d9eb5afbc57189$var$_prefix],
        onChange: (val)=>props.setAttributes({
                posterImage: val
            })
    }), /*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$PanelRow, null, /*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$MediaUploadCheck, null, /*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$BaseControl, {
        className: "editor-video-poster-control"
    }, /*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$MediaUpload, {
        title: $a3d9eb5afbc57189$var$__("Select poster image"),
        onSelect: (image)=>props.setAttributes({
                posterImageURL: image.url
            }),
        allowedTypes: [
            "image"
        ],
        render: ({ open: open  })=>/*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$Button, {
                variant: "primary",
                onClick: open,
                ref: posterImageButton,
                "aria-describedby": videoPosterDescription
            }, values.posterImageURL === "" ? $a3d9eb5afbc57189$var$__("Select") : $a3d9eb5afbc57189$var$__("Replace"))
    }), /*#__PURE__*/ React.createElement("p", {
        id: videoPosterDescription,
        hidden: true
    }, values.posterImageURL !== "" ? sprintf(/* translators: %s: poster image URL. */ $a3d9eb5afbc57189$var$__("The current poster image url is %s"), values.posterImageURL) : $a3d9eb5afbc57189$var$__("There is no poster image currently selected")), values.posterImageURL !== "" && /*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$Button, {
        onClick: (image)=>props.setAttributes({
                posterImageURL: ""
            }),
        variant: "tertiary"
    }, $a3d9eb5afbc57189$var$__("Remove"))))));
    else return /*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$Fragment, null, /*#__PURE__*/ React.createElement($a3d9eb5afbc57189$var$ToggleControl, {
        label: $a3d9eb5afbc57189$var$__("Poster Image", "sv100_premium"),
        value: values[$a3d9eb5afbc57189$var$_prefix],
        checked: values[$a3d9eb5afbc57189$var$_prefix],
        onChange: (val)=>props.setAttributes({
                posterImage: val
            })
    }));
}
var $a3d9eb5afbc57189$export$2e2bcd8739ae039 = $a3d9eb5afbc57189$var$PosterImage;



const $0cdc8f863db3dbd0$var$attributes = {
    boxShadowActive: {
        type: "boolean",
        default: false
    },
    boxShadowMoreActive: {
        type: "boolean",
        default: false
    },
    // type
    boxShadowType1Mobile: {
        type: "string",
        default: "outside"
    },
    boxShadowType1MobileLandscape: {
        type: "string",
        default: "outside"
    },
    boxShadowType1Tablet: {
        type: "string",
        default: "outside"
    },
    boxShadowType1TabletLandscape: {
        type: "string",
        default: "outside"
    },
    boxShadowType1TabletPro: {
        type: "string",
        default: "outside"
    },
    boxShadowType1TabletProLandscape: {
        type: "string",
        default: "outside"
    },
    boxShadowType1Desktop: {
        type: "string",
        default: "outside"
    },
    // boxShadow offset x
    boxShadowOffsetX1Mobile: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX1MobileLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX1Tablet: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX1TabletLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX1TabletPro: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX1TabletProLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX1Desktop: {
        type: "string",
        default: ""
    },
    // boxShadow offset y
    boxShadowOffsetY1Mobile: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY1MobileLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY1Tablet: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY1TabletLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY1TabletPro: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY1TabletProLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY1Desktop: {
        type: "string",
        default: ""
    },
    // blur radius
    boxShadowBlur1Mobile: {
        type: "string",
        default: ""
    },
    boxShadowBlur1MobileLandscape: {
        type: "string",
        default: ""
    },
    boxShadowBlur1Tablet: {
        type: "string",
        default: ""
    },
    boxShadowBlur1TabletLandscape: {
        type: "string",
        default: ""
    },
    boxShadowBlur1TabletPro: {
        type: "string",
        default: ""
    },
    boxShadowBlur1TabletProLandscape: {
        type: "string",
        default: ""
    },
    boxShadowBlur1Desktop: {
        type: "string",
        default: ""
    },
    // spread radius
    boxShadowSpread1Mobile: {
        type: "string",
        default: ""
    },
    boxShadowSpread1MobileLandscape: {
        type: "string",
        default: ""
    },
    boxShadowSpread1Tablet: {
        type: "string",
        default: ""
    },
    boxShadowSpread1TabletLandscape: {
        type: "string",
        default: ""
    },
    boxShadowSpread1TabletPro: {
        type: "string",
        default: ""
    },
    boxShadowSpread1TabletProLandscape: {
        type: "string",
        default: ""
    },
    boxShadowSpread1Desktop: {
        type: "string",
        default: ""
    },
    // color
    boxShadowColor1Mobile: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor1MobileLandscape: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor1Tablet: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor1TabletLandscape: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor1TabletPro: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor1TabletProLandscape: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor1Desktop: {
        type: "string",
        default: "#000000"
    },
    // ------- 2nd shadow
    // type
    boxShadowType2Mobile: {
        type: "string",
        default: "outside"
    },
    boxShadowType2MobileLandscape: {
        type: "string",
        default: "outside"
    },
    boxShadowType2Tablet: {
        type: "string",
        default: "outside"
    },
    boxShadowType2TabletLandscape: {
        type: "string",
        default: "outside"
    },
    boxShadowType2TabletPro: {
        type: "string",
        default: "outside"
    },
    boxShadowType2TabletProLandscape: {
        type: "string",
        default: "outside"
    },
    boxShadowType2Desktop: {
        type: "string",
        default: "outside"
    },
    // boxShadow offset x
    boxShadowOffsetX2Mobile: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX2MobileLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX2Tablet: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX2TabletLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX2TabletPro: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX2TabletProLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetX2Desktop: {
        type: "string",
        default: ""
    },
    // boxShadow offset y
    boxShadowOffsetY2Mobile: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY2MobileLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY2Tablet: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY2TabletLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY2TabletPro: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY2TabletProLandscape: {
        type: "string",
        default: ""
    },
    boxShadowOffsetY2Desktop: {
        type: "string",
        default: ""
    },
    // blur radius
    boxShadowBlur2Mobile: {
        type: "string",
        default: ""
    },
    boxShadowBlur2MobileLandscape: {
        type: "string",
        default: ""
    },
    boxShadowBlur2Tablet: {
        type: "string",
        default: ""
    },
    boxShadowBlur2TabletLandscape: {
        type: "string",
        default: ""
    },
    boxShadowBlur2TabletPro: {
        type: "string",
        default: ""
    },
    boxShadowBlur2TabletProLandscape: {
        type: "string",
        default: ""
    },
    boxShadowBlur2Desktop: {
        type: "string",
        default: ""
    },
    // spread radius
    boxShadowSpread2Mobile: {
        type: "string",
        default: ""
    },
    boxShadowSpread2MobileLandscape: {
        type: "string",
        default: ""
    },
    boxShadowSpread2Tablet: {
        type: "string",
        default: ""
    },
    boxShadowSpread2TabletLandscape: {
        type: "string",
        default: ""
    },
    boxShadowSpread2TabletPro: {
        type: "string",
        default: ""
    },
    boxShadowSpread2TabletProLandscape: {
        type: "string",
        default: ""
    },
    boxShadowSpread2Desktop: {
        type: "string",
        default: ""
    },
    // color
    boxShadowColor2Mobile: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor2MobileLandscape: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor2Tablet: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor2TabletLandscape: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor2TabletPro: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor2TabletProLandscape: {
        type: "string",
        default: "#000000"
    },
    boxShadowColor2Desktop: {
        type: "string",
        default: "#000000"
    },
    // utils
    _boxShadowColor1Popover: {
        type: "boolean",
        default: false
    },
    _boxShadowColor2Popover: {
        type: "boolean",
        default: false
    },
    _boxShadowColor1PopoverCallback: {
        type: "object",
        default: {}
    },
    _boxShadowColor2PopoverCallback: {
        type: "object",
        default: {}
    }
};
var $0cdc8f863db3dbd0$export$2e2bcd8739ae039 = $0cdc8f863db3dbd0$var$attributes;



function $8c2f87e5b6b96cb9$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    let { boxShadowType1Mobile: // boxShadow type
    boxShadowType1Mobile , boxShadowType1MobileLandscape: boxShadowType1MobileLandscape , boxShadowType1Tablet: boxShadowType1Tablet , boxShadowType1TabletLandscape: boxShadowType1TabletLandscape , boxShadowType1TabletPro: boxShadowType1TabletPro , boxShadowType1TabletProLandscape: boxShadowType1TabletProLandscape , boxShadowType1Desktop: boxShadowType1Desktop , boxShadowOffsetX1Mobile: // boxShadow offset x
    boxShadowOffsetX1Mobile , boxShadowOffsetX1MobileLandscape: boxShadowOffsetX1MobileLandscape , boxShadowOffsetX1Tablet: boxShadowOffsetX1Tablet , boxShadowOffsetX1TabletLandscape: boxShadowOffsetX1TabletLandscape , boxShadowOffsetX1TabletPro: boxShadowOffsetX1TabletPro , boxShadowOffsetX1TabletProLandscape: boxShadowOffsetX1TabletProLandscape , boxShadowOffsetX1Desktop: boxShadowOffsetX1Desktop , boxShadowOffsetY1Mobile: // boxShadow offset y
    boxShadowOffsetY1Mobile , boxShadowOffsetY1MobileLandscape: boxShadowOffsetY1MobileLandscape , boxShadowOffsetY1Tablet: boxShadowOffsetY1Tablet , boxShadowOffsetY1TabletLandscape: boxShadowOffsetY1TabletLandscape , boxShadowOffsetY1TabletPro: boxShadowOffsetY1TabletPro , boxShadowOffsetY1TabletProLandscape: boxShadowOffsetY1TabletProLandscape , boxShadowOffsetY1Desktop: boxShadowOffsetY1Desktop , boxShadowBlur1Mobile: // blur radius
    boxShadowBlur1Mobile , boxShadowBlur1MobileLandscape: boxShadowBlur1MobileLandscape , boxShadowBlur1Tablet: boxShadowBlur1Tablet , boxShadowBlur1TabletLandscape: boxShadowBlur1TabletLandscape , boxShadowBlur1TabletPro: boxShadowBlur1TabletPro , boxShadowBlur1TabletProLandscape: boxShadowBlur1TabletProLandscape , boxShadowBlur1Desktop: boxShadowBlur1Desktop , boxShadowSpread1Mobile: // spread radius
    boxShadowSpread1Mobile , boxShadowSpread1MobileLandscape: boxShadowSpread1MobileLandscape , boxShadowSpread1Tablet: boxShadowSpread1Tablet , boxShadowSpread1TabletLandscape: boxShadowSpread1TabletLandscape , boxShadowSpread1TabletPro: boxShadowSpread1TabletPro , boxShadowSpread1TabletProLandscape: boxShadowSpread1TabletProLandscape , boxShadowSpread1Desktop: boxShadowSpread1Desktop , boxShadowColor1Mobile: // color
    boxShadowColor1Mobile , boxShadowColor1MobileLandscape: boxShadowColor1MobileLandscape , boxShadowColor1Tablet: boxShadowColor1Tablet , boxShadowColor1TabletLandscape: boxShadowColor1TabletLandscape , boxShadowColor1TabletPro: boxShadowColor1TabletPro , boxShadowColor1TabletProLandscape: boxShadowColor1TabletProLandscape , boxShadowColor1Desktop: boxShadowColor1Desktop , boxShadowType2Mobile: // ------- 2nd shadow
    // boxShadow type
    boxShadowType2Mobile , boxShadowType2MobileLandscape: boxShadowType2MobileLandscape , boxShadowType2Tablet: boxShadowType2Tablet , boxShadowType2TabletLandscape: boxShadowType2TabletLandscape , boxShadowType2TabletPro: boxShadowType2TabletPro , boxShadowType2TabletProLandscape: boxShadowType2TabletProLandscape , boxShadowType2Desktop: boxShadowType2Desktop , boxShadowOffsetX2Mobile: // boxShadow offset x
    boxShadowOffsetX2Mobile , boxShadowOffsetX2MobileLandscape: boxShadowOffsetX2MobileLandscape , boxShadowOffsetX2Tablet: boxShadowOffsetX2Tablet , boxShadowOffsetX2TabletLandscape: boxShadowOffsetX2TabletLandscape , boxShadowOffsetX2TabletPro: boxShadowOffsetX2TabletPro , boxShadowOffsetX2TabletProLandscape: boxShadowOffsetX2TabletProLandscape , boxShadowOffsetX2Desktop: boxShadowOffsetX2Desktop , boxShadowOffsetY2Mobile: // boxShadow offset y
    boxShadowOffsetY2Mobile , boxShadowOffsetY2MobileLandscape: boxShadowOffsetY2MobileLandscape , boxShadowOffsetY2Tablet: boxShadowOffsetY2Tablet , boxShadowOffsetY2TabletLandscape: boxShadowOffsetY2TabletLandscape , boxShadowOffsetY2TabletPro: boxShadowOffsetY2TabletPro , boxShadowOffsetY2TabletProLandscape: boxShadowOffsetY2TabletProLandscape , boxShadowOffsetY2Desktop: boxShadowOffsetY2Desktop , boxShadowBlur2Mobile: // blur radius
    boxShadowBlur2Mobile , boxShadowBlur2MobileLandscape: boxShadowBlur2MobileLandscape , boxShadowBlur2Tablet: boxShadowBlur2Tablet , boxShadowBlur2TabletLandscape: boxShadowBlur2TabletLandscape , boxShadowBlur2TabletPro: boxShadowBlur2TabletPro , boxShadowBlur2TabletProLandscape: boxShadowBlur2TabletProLandscape , boxShadowBlur2Desktop: boxShadowBlur2Desktop , boxShadowSpread2Mobile: // spread radius
    boxShadowSpread2Mobile , boxShadowSpread2MobileLandscape: boxShadowSpread2MobileLandscape , boxShadowSpread2Tablet: boxShadowSpread2Tablet , boxShadowSpread2TabletLandscape: boxShadowSpread2TabletLandscape , boxShadowSpread2TabletPro: boxShadowSpread2TabletPro , boxShadowSpread2TabletProLandscape: boxShadowSpread2TabletProLandscape , boxShadowSpread2Desktop: boxShadowSpread2Desktop , boxShadowColor2Mobile: // color
    boxShadowColor2Mobile , boxShadowColor2MobileLandscape: boxShadowColor2MobileLandscape , boxShadowColor2Tablet: boxShadowColor2Tablet , boxShadowColor2TabletLandscape: boxShadowColor2TabletLandscape , boxShadowColor2TabletPro: boxShadowColor2TabletPro , boxShadowColor2TabletProLandscape: boxShadowColor2TabletProLandscape , boxShadowColor2Desktop: boxShadowColor2Desktop  } = attr; // for later support of other units
    const appendix = " !important"; // prepare css string
    if (boxShadowType1Mobile === "inside" && typeof boxShadowOffsetX1Mobile !== "undefined" && boxShadowOffsetX1Mobile !== "") boxShadowOffsetX1Mobile = "inset " + boxShadowOffsetX1Mobile;
    if (boxShadowType2Mobile === "inside" && typeof boxShadowOffsetX2Mobile !== "undefined" && boxShadowOffsetX2Mobile !== "") boxShadowOffsetX2Mobile = "inset " + boxShadowOffsetX2Mobile;
     // offset-x | offset-y | blur-radius | spread-radius | color
    let _value = [
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX1Mobile, boxShadowOffsetY1Mobile, boxShadowBlur1Mobile, boxShadowSpread1Mobile, boxShadowColor1Mobile),
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX2Mobile, boxShadowOffsetY2Mobile, boxShadowBlur2Mobile, boxShadowSpread2Mobile, boxShadowColor2Mobile)
    ].filter((val)=>val !== "undefined").join(", "); // selectors
    const mobile = {
        [wpBlockSelector]: {
            "box-shadow": typeof _value !== "undefined" ? _value + appendix : ""
        }
    };
    if (boxShadowType1MobileLandscape === "inside" && typeof boxShadowOffsetX1MobileLandscape !== "undefined" && boxShadowOffsetX1MobileLandscape !== "") boxShadowOffsetX1MobileLandscape = "inset " + boxShadowOffsetX1MobileLandscape;
    if (boxShadowType2MobileLandscape === "inside" && typeof boxShadowOffsetX2MobileLandscape !== "undefined" && boxShadowOffsetX2MobileLandscape !== "") boxShadowOffsetX2MobileLandscape = "inset " + boxShadowOffsetX2MobileLandscape;
    _value = [
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX1MobileLandscape, boxShadowOffsetY1MobileLandscape, boxShadowBlur1MobileLandscape, boxShadowSpread1MobileLandscape, boxShadowColor1MobileLandscape),
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX2MobileLandscape, boxShadowOffsetY2MobileLandscape, boxShadowBlur2MobileLandscape, boxShadowSpread2MobileLandscape, boxShadowColor2MobileLandscape)
    ].filter((val)=>val !== "undefined").join(", ");
    const mobileLandscape = {
        [wpBlockSelector]: {
            "box-shadow": typeof _value !== "undefined" ? _value + appendix : ""
        }
    };
    if (boxShadowType1Tablet === "inside" && typeof boxShadowOffsetX1Tablet !== "undefined" && boxShadowOffsetX1Tablet !== "") boxShadowOffsetX1Tablet = "inset " + boxShadowOffsetX1Tablet;
    if (boxShadowType2Tablet === "inside" && typeof boxShadowOffsetX2Tablet !== "undefined" && boxShadowOffsetX2Tablet !== "") boxShadowOffsetX2Tablet = "inset " + boxShadowOffsetX2Tablet;
    _value = [
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX1Tablet, boxShadowOffsetY1Tablet, boxShadowBlur1Tablet, boxShadowSpread1Tablet, boxShadowColor1Tablet),
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX2Tablet, boxShadowOffsetY2Tablet, boxShadowBlur2Tablet, boxShadowSpread2Tablet, boxShadowColor2Tablet)
    ].filter((val)=>val !== "undefined").join(", ");
    const tablet = {
        [wpBlockSelector]: {
            "box-shadow": typeof _value !== "undefined" ? _value + appendix : ""
        }
    };
    if (boxShadowType1TabletLandscape === "inside" && typeof boxShadowOffsetX1TabletLandscape !== "undefined" && boxShadowOffsetX1TabletLandscape !== "") boxShadowOffsetX1TabletLandscape = "inset " + boxShadowOffsetX1TabletLandscape;
    if (boxShadowType2TabletLandscape === "inside" && typeof boxShadowOffsetX2TabletLandscape !== "undefined" && boxShadowOffsetX2TabletLandscape !== "") boxShadowOffsetX2TabletLandscape = "inset " + boxShadowOffsetX2TabletLandscape;
    _value = [
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX1TabletLandscape, boxShadowOffsetY1TabletLandscape, boxShadowBlur1TabletLandscape, boxShadowSpread1TabletLandscape, boxShadowColor1TabletLandscape),
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX2TabletLandscape, boxShadowOffsetY2TabletLandscape, boxShadowBlur2TabletLandscape, boxShadowSpread2TabletLandscape, boxShadowColor2TabletLandscape)
    ].filter((val)=>val !== "undefined").join(", ");
    const tabletLandscape = {
        [wpBlockSelector]: {
            "box-shadow": typeof _value !== "undefined" ? _value + appendix : ""
        }
    };
    if (boxShadowType1TabletPro === "inside" && typeof boxShadowOffsetX1TabletPro !== "undefined" && boxShadowOffsetX1TabletPro !== "") boxShadowOffsetX1TabletPro = "inset " + boxShadowOffsetX1TabletPro;
    if (boxShadowType2TabletPro === "inside" && typeof boxShadowOffsetX2TabletPro !== "undefined" && boxShadowOffsetX2TabletPro !== "") boxShadowOffsetX2TabletPro = "inset " + boxShadowOffsetX2TabletPro;
    _value = [
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX1TabletPro, boxShadowOffsetY1TabletPro, boxShadowBlur1TabletPro, boxShadowSpread1TabletPro, boxShadowColor1TabletPro),
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX2TabletPro, boxShadowOffsetY2TabletPro, boxShadowBlur2TabletPro, boxShadowSpread2TabletPro, boxShadowColor2TabletPro)
    ].filter((val)=>val !== "undefined").join(", ");
    const tabletPro = {
        [wpBlockSelector]: {
            "box-shadow": typeof _value !== "undefined" ? _value + appendix : ""
        }
    };
    if (boxShadowType1TabletProLandscape === "inside" && typeof boxShadowOffsetX1TabletProLandscape !== "undefined" && boxShadowOffsetX1TabletProLandscape !== "") boxShadowOffsetX1TabletProLandscape = "inset " + boxShadowOffsetX1TabletProLandscape;
    if (boxShadowType2TabletProLandscape === "inside" && typeof boxShadowOffsetX2TabletProLandscape !== "undefined" && boxShadowOffsetX2TabletProLandscape !== "") boxShadowOffsetX2TabletProLandscape = "inset " + boxShadowOffsetX2TabletProLandscape;
    _value = [
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX1TabletProLandscape, boxShadowOffsetY1TabletProLandscape, boxShadowBlur1TabletProLandscape, boxShadowSpread1TabletProLandscape, boxShadowColor1TabletProLandscape),
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX2TabletProLandscape, boxShadowOffsetY2TabletProLandscape, boxShadowBlur2TabletProLandscape, boxShadowSpread2TabletProLandscape, boxShadowColor2TabletProLandscape)
    ].filter((val)=>val !== "undefined").join(", ");
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "box-shadow": typeof _value !== "undefined" ? _value + appendix : ""
        }
    };
    if (boxShadowType1Desktop === "inside" && typeof boxShadowOffsetX1Desktop !== "undefined" && boxShadowOffsetX1Desktop !== "") boxShadowOffsetX1Desktop = "inset " + boxShadowOffsetX1Desktop;
    if (boxShadowType2Desktop === "inside" && typeof boxShadowOffsetX2Desktop !== "undefined" && boxShadowOffsetX2Desktop !== "") boxShadowOffsetX2Desktop = "inset " + boxShadowOffsetX2Desktop;
    _value = [
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX1Desktop, boxShadowOffsetY1Desktop, boxShadowBlur1Desktop, boxShadowSpread1Desktop, boxShadowColor1Desktop),
        (0, $20b4a97a61b3fccb$export$18b25f20b033ac8e)(boxShadowOffsetX2Desktop, boxShadowOffsetY2Desktop, boxShadowBlur2Desktop, boxShadowSpread2Desktop, boxShadowColor2Desktop)
    ].filter((val)=>val !== "undefined").join(", ");
    const desktop = {
        [wpBlockSelector]: {
            "box-shadow": typeof _value !== "undefined" ? _value + appendix : ""
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $8c2f87e5b6b96cb9$export$2e2bcd8739ae039 = $8c2f87e5b6b96cb9$var$EditorStyles;



const { Fragment: $1f8999a72185a819$var$Fragment  } = wp.element;
const { PanelRow: $1f8999a72185a819$var$PanelRow , ToggleControl: $1f8999a72185a819$var$ToggleControl , __experimentalUnitControl: $1f8999a72185a819$var$__experimentalUnitControl , SelectControl: $1f8999a72185a819$var$SelectControl , Flex: $1f8999a72185a819$var$Flex , FlexBlock: $1f8999a72185a819$var$FlexBlock , FlexItem: $1f8999a72185a819$var$FlexItem , ColorIndicator: $1f8999a72185a819$var$ColorIndicator , ColorPicker: $1f8999a72185a819$var$ColorPicker , ColorPalette: $1f8999a72185a819$var$ColorPalette , Popover: $1f8999a72185a819$var$Popover  } = wp.components;
const $1f8999a72185a819$var$UnitControl = $1f8999a72185a819$var$__experimentalUnitControl;
const { __: $1f8999a72185a819$var$__  } = wp.i18n;
function $1f8999a72185a819$var$BoxShadowFragment(props) {
    const _name = "BoxShadow";
    const _prefix = "boxShadow";
    const values = props.attributes;
    const currentResponsiveTab = typeof props.attributes.currentResponsiveTab !== "undefined" ? props.attributes.currentResponsiveTab : "Mobile";
    const settings = wp.data.select("core/block-editor").getSettings();
    let themeColors = [];
    if (settings && settings.colors) themeColors = settings.colors;
    const num = props.num;
    return /*#__PURE__*/ React.createElement($1f8999a72185a819$var$Fragment, null, /*#__PURE__*/ React.createElement("p", null, "Shadow " + num + ": X | Y | Blur | Spread"), /*#__PURE__*/ React.createElement($1f8999a72185a819$var$PanelRow, null, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$Flex, {
        gap: "2px"
    }, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$FlexItem, null, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$UnitControl, {
        value: values[_prefix + "OffsetX" + num + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, _name, _prefix + "OffsetX" + num, (0, $8c2f87e5b6b96cb9$export$2e2bcd8739ae039)),
        onUnitChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, _name, _prefix + "OffsetX" + num, (0, $8c2f87e5b6b96cb9$export$2e2bcd8739ae039)),
        allowReset: false
    })), /*#__PURE__*/ React.createElement($1f8999a72185a819$var$FlexItem, null, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$UnitControl, {
        value: values[_prefix + "OffsetY" + num + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, _name, _prefix + "OffsetY" + num, (0, $8c2f87e5b6b96cb9$export$2e2bcd8739ae039)),
        onUnitChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, _name, _prefix + "OffsetY" + num, (0, $8c2f87e5b6b96cb9$export$2e2bcd8739ae039)),
        allowReset: false
    })), /*#__PURE__*/ React.createElement($1f8999a72185a819$var$FlexItem, null, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$UnitControl, {
        value: values[_prefix + "Blur" + num + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, _name, _prefix + "Blur" + num, (0, $8c2f87e5b6b96cb9$export$2e2bcd8739ae039)),
        onUnitChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, _name, _prefix + "Blur" + num, (0, $8c2f87e5b6b96cb9$export$2e2bcd8739ae039)),
        allowReset: false
    })), /*#__PURE__*/ React.createElement($1f8999a72185a819$var$FlexItem, null, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$UnitControl, {
        value: values[_prefix + "Spread" + num + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, _name, _prefix + "Spread" + num, (0, $8c2f87e5b6b96cb9$export$2e2bcd8739ae039)),
        onUnitChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, _name, _prefix + "Spread" + num, (0, $8c2f87e5b6b96cb9$export$2e2bcd8739ae039)),
        allowReset: false
    })))), /*#__PURE__*/ React.createElement($1f8999a72185a819$var$PanelRow, null, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$Flex, {
        justify: "flex-start"
    }, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$FlexItem, null, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$SelectControl, {
        value: values[_prefix + "Type" + num + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, _name, _prefix + "Type" + num, (0, $8c2f87e5b6b96cb9$export$2e2bcd8739ae039)),
        options: [
            {
                label: $1f8999a72185a819$var$__("Outside", "sv100_premium"),
                value: "outside"
            },
            {
                label: $1f8999a72185a819$var$__("Inside", "sv100_premium"),
                value: "inside"
            }
        ]
    })), /*#__PURE__*/ React.createElement($1f8999a72185a819$var$FlexItem, null, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$ColorIndicator, {
        className: "clickable",
        colorValue: values[_prefix + "Color" + num + currentResponsiveTab],
        onClick: ()=>props.setAttributes({
                ["_borderColor" + num + "Popover"]: true
            })
    }), values["_borderColor" + num + "Popover"] === true && /*#__PURE__*/ React.createElement($1f8999a72185a819$var$Popover, {
        position: "left",
        onClose: ()=>props.setAttributes({
                ["_borderColor" + num + "Popover"]: false
            })
    }, /*#__PURE__*/ React.createElement($1f8999a72185a819$var$ColorPalette, {
        colors: themeColors,
        value: values[_prefix + "Color" + num + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, _name, _prefix + "Color" + num, (0, $8c2f87e5b6b96cb9$export$2e2bcd8739ae039))
    }))))));
}
var $1f8999a72185a819$export$2e2bcd8739ae039 = $1f8999a72185a819$var$BoxShadowFragment;


function $d3da9688d364e761$var$_extends() {
    $d3da9688d364e761$var$_extends = Object.assign ? Object.assign.bind() : function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
        }
        return target;
    };
    return $d3da9688d364e761$var$_extends.apply(this, arguments);
}
const { Fragment: $d3da9688d364e761$var$Fragment  } = wp.element;
const { ToggleControl: $d3da9688d364e761$var$ToggleControl  } = wp.components;
const { addFilter: $d3da9688d364e761$var$addFilter  } = wp.hooks;
const { __: $d3da9688d364e761$var$__  } = wp.i18n;
const $d3da9688d364e761$var$_name = "BoxShadow";
const $d3da9688d364e761$var$_prefix = "boxShadow"; // register attributes
const $d3da9688d364e761$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $d3da9688d364e761$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, settings.attributes, (0, $0cdc8f863db3dbd0$export$2e2bcd8739ae039));
    return settings;
};
$d3da9688d364e761$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $d3da9688d364e761$var$addCustomControlAttributes); // the component
function $d3da9688d364e761$var$BoxShadow(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $d3da9688d364e761$var$_name)) return /*#__PURE__*/ React.createElement($d3da9688d364e761$var$Fragment, null);
    const values = props.attributes;
    if (values[$d3da9688d364e761$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($d3da9688d364e761$var$Fragment, null, /*#__PURE__*/ React.createElement($d3da9688d364e761$var$ToggleControl, {
        label: $d3da9688d364e761$var$__("Box Shadow", "sv100_premium"),
        checked: values[$d3da9688d364e761$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$d3da9688d364e761$var$_prefix + "Active"]: val
            })
    }), /*#__PURE__*/ React.createElement((0, $1f8999a72185a819$export$2e2bcd8739ae039), $d3da9688d364e761$var$_extends({}, props, {
        num: 1
    })), /*#__PURE__*/ React.createElement((0, $1f8999a72185a819$export$2e2bcd8739ae039), $d3da9688d364e761$var$_extends({}, props, {
        num: 2
    })));
    else return /*#__PURE__*/ React.createElement($d3da9688d364e761$var$Fragment, null, /*#__PURE__*/ React.createElement($d3da9688d364e761$var$ToggleControl, {
        label: $d3da9688d364e761$var$__("Box Shadow", "sv100_premium"),
        checked: values[$d3da9688d364e761$var$_prefix + "Active"],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, {
                [$d3da9688d364e761$var$_prefix + "Active"]: val
            })
    }));
}
var $d3da9688d364e761$export$2e2bcd8739ae039 = $d3da9688d364e761$var$BoxShadow;



function $9505ceb22d44b2cb$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const { gridGapMobile: gridGapMobile , gridGapMobileLandscape: gridGapMobileLandscape , gridGapTablet: gridGapTablet , gridGapTabletLandscape: gridGapTabletLandscape , gridGapTabletPro: gridGapTabletPro , gridGapTabletProLandscape: gridGapTabletProLandscape , gridGapDesktop: gridGapDesktop  } = attr; // selectors
    const mobile = {
        [wpBlockSelector]: {
            "display": "grid !important",
            // init grid display
            "gap": gridGapMobile !== "" ? gridGapMobile + "px" : 0
        }
    };
    const mobileLandscape = {
        [wpBlockSelector]: {
            "gap": gridGapMobileLandscape !== "" ? gridGapMobileLandscape + "px" : 0
        }
    };
    const tablet = {
        [wpBlockSelector]: {
            "gap": gridGapTablet !== "" ? gridGapTablet + "px" : 0
        }
    };
    const tabletLandscape = {
        [wpBlockSelector]: {
            "gap": gridGapTabletLandscape !== "" ? gridGapTabletLandscape + "px" : 0
        }
    };
    const tabletPro = {
        [wpBlockSelector]: {
            "gap": gridGapTabletPro !== "" ? gridGapTabletPro + "px" : 0
        }
    };
    const tabletProLandscape = {
        [wpBlockSelector]: {
            "gap": gridGapTabletProLandscape !== "" ? gridGapTabletProLandscape + "px" : 0
        }
    };
    const desktop = {
        [wpBlockSelector]: {
            "gap": gridGapDesktop !== "" ? gridGapDesktop + "px" : 0
        }
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape");
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop");
    return css;
}
var $9505ceb22d44b2cb$export$2e2bcd8739ae039 = $9505ceb22d44b2cb$var$EditorStyles;



const { Fragment: $5156b8be075b487d$var$Fragment  } = wp.element;
const { RangeControl: $5156b8be075b487d$var$RangeControl  } = wp.components;
const { addFilter: $5156b8be075b487d$var$addFilter  } = wp.hooks;
const { __: $5156b8be075b487d$var$__  } = wp.i18n;
const $5156b8be075b487d$var$_name = "GridGap";
const $5156b8be075b487d$var$_prefix = "gridGap"; // register attributes
const $5156b8be075b487d$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $5156b8be075b487d$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        gridGapMobile: {
            type: "integer",
            default: 10
        },
        gridGapMobileLandscape: {
            type: "integer",
            default: 10
        },
        gridGapTablet: {
            type: "integer",
            default: 10
        },
        gridGapTabletLandscape: {
            type: "integer",
            default: 10
        },
        gridGapTabletPro: {
            type: "integer",
            default: 10
        },
        gridGapTabletProLandscape: {
            type: "integer",
            default: 10
        },
        gridGapDesktop: {
            type: "integer",
            default: 10
        }
    });
    return settings;
};
$5156b8be075b487d$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $5156b8be075b487d$var$addCustomControlAttributes); // the component
function $5156b8be075b487d$var$GridGap(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $5156b8be075b487d$var$_name)) return /*#__PURE__*/ React.createElement($5156b8be075b487d$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    return /*#__PURE__*/ React.createElement($5156b8be075b487d$var$Fragment, null, /*#__PURE__*/ React.createElement($5156b8be075b487d$var$RangeControl, {
        label: $5156b8be075b487d$var$__("Gap", "sv100_premium"),
        value: values[$5156b8be075b487d$var$_prefix + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $5156b8be075b487d$var$_name, $5156b8be075b487d$var$_prefix, (0, $9505ceb22d44b2cb$export$2e2bcd8739ae039)),
        min: 0,
        max: 500
    }));
}
var $5156b8be075b487d$export$2e2bcd8739ae039 = $5156b8be075b487d$var$GridGap;



function $a3fb192cf9eff235$var$EditorStyles(attr, name) {
    const wpBlockSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr);
    const wpBlockChildrenSelector = (0, $20b4a97a61b3fccb$export$a7272da64dd3b70a)(name, attr) + " > *"; // these lines are for grid matrix support later
    const children = document.querySelectorAll(".sv100-premium-block-core-" + attr.blockId + " > *");
    const cCount = children.length;
    const { gridOrderMobile: gridOrderMobile , gridOrderMobileLandscape: gridOrderMobileLandscape , gridOrderTablet: gridOrderTablet , gridOrderTabletLandscape: gridOrderTabletLandscape , gridOrderTabletPro: gridOrderTabletPro , gridOrderTabletProLandscape: gridOrderTabletProLandscape , gridOrderDesktop: gridOrderDesktop , gridOrderReverseMobile: gridOrderReverseMobile , gridOrderReverseMobileLandscape: gridOrderReverseMobileLandscape , gridOrderReverseTablet: gridOrderReverseTablet , gridOrderReverseTabletLandscape: gridOrderReverseTabletLandscape , gridOrderReverseTabletPro: gridOrderReverseTabletPro , gridOrderReverseTabletProLandscape: gridOrderReverseTabletProLandscape , gridOrderReverseDesktop: gridOrderReverseDesktop  } = attr; // selectors
    let mobile = {}; // ORDER REVERSE-----------------------------------------------------------------------------
    if (gridOrderReverseMobile === true) for(let i = 0; i < cCount; i++)mobile[wpBlockChildrenSelector + ":nth-child(" + (i + 1) + ")"] = {
        "grid-column": cCount - i + "!important"
    }, mobile[".is-stacked-on-mobile" + wpBlockChildrenSelector + ":nth-child(" + (i + 1) + ")"] = {
        // hot implementation for native stacked mobile
        "grid-row": cCount - i + "!important"
    };
    else for(let i1 = 0; i1 < cCount; i1++)mobile[wpBlockChildrenSelector + ":nth-child(" + (i1 + 1) + ")"] = {
        "grid-column": "revert !important"
    };
    let mobileLandscape = {};
    if (gridOrderReverseMobileLandscape === true) for(let i2 = 0; i2 < cCount; i2++)mobileLandscape[wpBlockChildrenSelector + ":nth-child(" + (i2 + 1) + ")"] = {
        "grid-column": cCount - i2 + "!important",
        "grid-row": "1 !important"
    };
    else for(let i3 = 0; i3 < cCount; i3++)mobileLandscape[wpBlockChildrenSelector + ":nth-child(" + (i3 + 1) + ")"] = {
        "grid-column": "revert !important",
        "grid-row": "1 !important"
    };
    let tablet = {};
    if (gridOrderReverseTablet === true) for(let i4 = 0; i4 < cCount; i4++)tablet[wpBlockChildrenSelector + ":nth-child(" + (i4 + 1) + ")"] = {
        "grid-column": cCount - i4 + "!important",
        "grid-row": "1 !important"
    };
    else for(let i5 = 0; i5 < cCount; i5++)tablet[wpBlockChildrenSelector + ":nth-child(" + (i5 + 1) + ")"] = {
        "grid-column": "revert !important",
        "grid-row": "1 !important"
    };
    let tabletLandscape = {};
    if (gridOrderReverseTabletLandscape === true) for(let i6 = 0; i6 < cCount; i6++)tabletLandscape[wpBlockChildrenSelector + ":nth-child(" + (i6 + 1) + ")"] = {
        "grid-column": cCount - i6 + "!important",
        "grid-row": "1 !important"
    };
    else for(let i7 = 0; i7 < cCount; i7++)tabletLandscape[wpBlockChildrenSelector + ":nth-child(" + (i7 + 1) + ")"] = {
        "grid-column": "revert !important",
        "grid-row": "1 !important"
    };
    let tabletPro = {};
    if (gridOrderReverseTabletPro === true) for(let i8 = 0; i8 < cCount; i8++)tabletPro[wpBlockChildrenSelector + ":nth-child(" + (i8 + 1) + ")"] = {
        "grid-column": cCount - i8 + "!important",
        "grid-row": "1 !important"
    };
    else for(let i9 = 0; i9 < cCount; i9++)tabletPro[wpBlockChildrenSelector + ":nth-child(" + (i9 + 1) + ")"] = {
        "grid-column": "revert !important",
        "grid-row": "1 !important"
    };
    let tabletProLandscape = {};
    if (gridOrderReverseTabletProLandscape === true) for(let i10 = 0; i10 < cCount; i10++)tabletProLandscape[wpBlockChildrenSelector + ":nth-child(" + (i10 + 1) + ")"] = {
        "grid-column": cCount - i10 + "!important",
        "grid-row": "1 !important"
    };
    else for(let i11 = 0; i11 < cCount; i11++)tabletProLandscape[wpBlockChildrenSelector + ":nth-child(" + (i11 + 1) + ")"] = {
        "grid-column": "revert !important",
        "grid-row": "1 !important"
    };
    let desktop = {};
    if (gridOrderReverseDesktop === true) for(let i12 = 0; i12 < cCount; i12++)desktop[wpBlockChildrenSelector + ":nth-child(" + (i12 + 1) + ")"] = {
        "grid-column": cCount - i12 + "!important",
        "grid-row": "1 !important"
    };
    else for(let i13 = 0; i13 < cCount; i13++)desktop[wpBlockChildrenSelector + ":nth-child(" + (i13 + 1) + ")"] = {
        "grid-column": "revert !important",
        "grid-row": "1 !important"
    };
    let css = "";
    const blockId = `.sv100-premium-block-core-${attr.blockId}`;
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobile, blockId, true, "mobile", "from", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(mobileLandscape, blockId, true, "mobileLandscape", "from", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tablet, blockId, true, "tablet", "from", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletLandscape, blockId, true, "tabletLandscape", "from", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletPro, blockId, true, "tabletPro", "from", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(tabletProLandscape, blockId, true, "tabletProLandscape", "from", true);
    css += (0, $20b4a97a61b3fccb$export$cd46662790a9feff)(desktop, blockId, true, "desktop", "from", true);
    return css;
}
var $a3fb192cf9eff235$export$2e2bcd8739ae039 = $a3fb192cf9eff235$var$EditorStyles;



const { Fragment: $d155880ba72010d2$var$Fragment  } = wp.element;
const { ToggleControl: $d155880ba72010d2$var$ToggleControl  } = wp.components;
const { addFilter: $d155880ba72010d2$var$addFilter  } = wp.hooks;
const { __: $d155880ba72010d2$var$__  } = wp.i18n;
const $d155880ba72010d2$var$_name = "GridOrder";
const $d155880ba72010d2$var$_prefix = "gridOrder"; // register attributes
const $d155880ba72010d2$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $d155880ba72010d2$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        gridOrderMobile: {
            type: "integer",
            default: "{}"
        },
        gridOrderMobileLandscape: {
            type: "integer",
            default: "{}"
        },
        gridOrderTablet: {
            type: "integer",
            default: "{}"
        },
        gridOrderTabletLandscape: {
            type: "integer",
            default: "{}"
        },
        gridOrderTabletPro: {
            type: "integer",
            default: "{}"
        },
        gridOrderTabletProLandscape: {
            type: "integer",
            default: "{}"
        },
        gridOrderDesktop: {
            type: "integer",
            default: "{}"
        },
        gridOrderReverseMobile: {
            type: "bool",
            default: false
        },
        gridOrderReverseMobileLandscape: {
            type: "bool",
            default: false
        },
        gridOrderReverseTablet: {
            type: "bool",
            default: false
        },
        gridOrderReverseTabletLandscape: {
            type: "bool",
            default: false
        },
        gridOrderReverseTabletPro: {
            type: "bool",
            default: false
        },
        gridOrderReverseTabletProLandscape: {
            type: "bool",
            default: false
        },
        gridOrderReverseDesktop: {
            type: "bool",
            default: false
        }
    });
    return settings;
};
$d155880ba72010d2$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $d155880ba72010d2$var$addCustomControlAttributes); // the component
function $d155880ba72010d2$var$GridOrder(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $d155880ba72010d2$var$_name)) return /*#__PURE__*/ React.createElement($d155880ba72010d2$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab;
    return /*#__PURE__*/ React.createElement($d155880ba72010d2$var$Fragment, null, /*#__PURE__*/ React.createElement("label", null, $d155880ba72010d2$var$__("Order (Experimental)", "sv100_premium")), /*#__PURE__*/ React.createElement($d155880ba72010d2$var$ToggleControl, {
        label: $d155880ba72010d2$var$__("Reverse", "sv100_premium"),
        checked: values[$d155880ba72010d2$var$_prefix + "Reverse" + currentResponsiveTab],
        value: values[$d155880ba72010d2$var$_prefix + "Reverse" + currentResponsiveTab],
        onChange: (val)=>(0, $20b4a97a61b3fccb$export$4d99a2890bb989f0)(val, props, $d155880ba72010d2$var$_name, $d155880ba72010d2$var$_prefix + "Reverse", (0, $a3fb192cf9eff235$export$2e2bcd8739ae039)),
        help: $d155880ba72010d2$var$__("This might not work as expected with multiple rows yet.", "sv100_premium")
    }));
}
var $d155880ba72010d2$export$2e2bcd8739ae039 = $d155880ba72010d2$var$GridOrder;




const { Fragment: $f41a90f8df406ed3$var$Fragment  } = wp.element;
const { ToggleControl: $f41a90f8df406ed3$var$ToggleControl , PanelRow: $f41a90f8df406ed3$var$PanelRow , Tooltip: $f41a90f8df406ed3$var$Tooltip  } = wp.components;
const { addFilter: $f41a90f8df406ed3$var$addFilter  } = wp.hooks;
const { __: $f41a90f8df406ed3$var$__  } = wp.i18n;
const $f41a90f8df406ed3$var$_name = "grid";
const $f41a90f8df406ed3$var$_prefix = "grid"; // register attributes
const $f41a90f8df406ed3$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name, $f41a90f8df406ed3$var$_name)) return settings;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    Object.assign(settings.attributes, {
        gridActive: {
            type: "boolean",
            default: false
        },
        gridInit: {
            type: "boolean",
            default: false
        }
    });
    return settings;
};
$f41a90f8df406ed3$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $f41a90f8df406ed3$var$addCustomControlAttributes); // the component
function $f41a90f8df406ed3$var$Grid(props) {
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name, $f41a90f8df406ed3$var$_name)) return /*#__PURE__*/ React.createElement($f41a90f8df406ed3$var$Fragment, null);
    const values = props.attributes;
    const currentResponsiveTab = props.attributes.currentResponsiveTab; // initialise default values -------------------------------------------------
    if (values[$f41a90f8df406ed3$var$_prefix + "Active"] === true && values.gridInit === false) {
        // move this later to a global function
        const attr = props.attributes;
        attr.parsedCSS = JSON.parse(attr.parsedCSS); // parse sub module CSS
        attr.parsedCSS["Gap"] = (0, $9505ceb22d44b2cb$export$2e2bcd8739ae039)(attr, props.name); //collapse css objects
        let css = "";
        Object.keys(attr.parsedCSS).map(function(key, index) {
            if (attr[(0, $20b4a97a61b3fccb$export$5b1f80f3c282648c)(key) + "Active"] === true) css += attr.parsedCSS[key];
        }); // update properties for rerender and injection
        props.setAttributes({
            parsedCSS: JSON.stringify(attr.parsedCSS),
            parsedCSSString: css,
            // this gets injected
            gridInit: true
        });
    } // initialise default values -------------------------------------------------
    if (values[$f41a90f8df406ed3$var$_prefix + "Active"] === true) return /*#__PURE__*/ React.createElement($f41a90f8df406ed3$var$Fragment, null, /*#__PURE__*/ React.createElement($f41a90f8df406ed3$var$ToggleControl, {
        label: $f41a90f8df406ed3$var$__("Grid Control", "sv100_premium"),
        checked: values[$f41a90f8df406ed3$var$_prefix + "Active"],
        onChange: (val)=>{
            (0, $20b4a97a61b3fccb$export$7c7d338baab9289b)(props, {
                [$f41a90f8df406ed3$var$_prefix + "Active"]: val,
                [$f41a90f8df406ed3$var$_prefix + "GapActive"]: val,
                // fake opt-in for sub modules
                [$f41a90f8df406ed3$var$_prefix + "OrderActive"]: val // fake opt-in for sub modules
            });
        },
        help: $f41a90f8df406ed3$var$__("This option forces grid behaviour on the selected block and only works if enabled constantly. Native ordering will not work with this option enabled.", "sv100_premium")
    }), /*#__PURE__*/ React.createElement((0, $5156b8be075b487d$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $d155880ba72010d2$export$2e2bcd8739ae039), props));
    else return /*#__PURE__*/ React.createElement($f41a90f8df406ed3$var$Fragment, null, /*#__PURE__*/ React.createElement($f41a90f8df406ed3$var$ToggleControl, {
        label: $f41a90f8df406ed3$var$__("Grid Control", "sv100_premium"),
        checked: values[$f41a90f8df406ed3$var$_prefix + "Active"],
        onChange: (val)=>{
            const attr = {
                [$f41a90f8df406ed3$var$_prefix + "Active"]: val,
                [$f41a90f8df406ed3$var$_prefix + "GapActive"]: val,
                // fake opt-in for sub modules
                [$f41a90f8df406ed3$var$_prefix + "OrderActive"]: val // fake opt-in for sub modules
            };
            (0, $20b4a97a61b3fccb$export$4a65a988b6cd1e7e)(props, attr);
        }
    }));
}
var $f41a90f8df406ed3$export$2e2bcd8739ae039 = $f41a90f8df406ed3$var$Grid;


const { Fragment: $18aec67ac328bd86$var$Fragment  } = wp.element;
function $18aec67ac328bd86$var$ExtendedControlComponents(props) {
    let input = /*#__PURE__*/ React.createElement($18aec67ac328bd86$var$Fragment, null, /*#__PURE__*/ React.createElement((0, $603b00a8dca58242$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $f41a90f8df406ed3$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $52bcc5f70b98ca28$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $1d7aa8fe3c1ca839$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $acb3993e69d69dd8$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $c058877659a10122$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $0e9638b714af9bb7$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $12467658f74e69ae$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $94efa96b67096507$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $c84270851130dd9f$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $d3da9688d364e761$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $968264db4d4c9c24$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $a28ac75086a0692d$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $9ef137adafc372fe$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $a3d9eb5afbc57189$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $83fcdd8284e1ab12$export$2e2bcd8739ae039), props), /*#__PURE__*/ React.createElement((0, $cc5ae2ca55ffe7d8$export$2e2bcd8739ae039), props));
    if (props.attributes._regenerateCSS) input = /*#__PURE__*/ React.createElement(Disabled, null, input);
    return /*#__PURE__*/ React.createElement($18aec67ac328bd86$var$Fragment, null, input);
}
var $18aec67ac328bd86$export$2e2bcd8739ae039 = $18aec67ac328bd86$var$ExtendedControlComponents;



function $41c8934c3a7e6aba$var$_extends() {
    $41c8934c3a7e6aba$var$_extends = Object.assign ? Object.assign.bind() : function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
        }
        return target;
    };
    return $41c8934c3a7e6aba$var$_extends.apply(this, arguments);
}
const { createHigherOrderComponent: $41c8934c3a7e6aba$var$createHigherOrderComponent  } = wp.compose;
const { Fragment: $41c8934c3a7e6aba$var$Fragment  } = wp.element;
const { InspectorControls: $41c8934c3a7e6aba$var$InspectorControls  } = wp.editor;
const { PanelBody: $41c8934c3a7e6aba$var$PanelBody , TabPanel: $41c8934c3a7e6aba$var$TabPanel , Dashicon: $41c8934c3a7e6aba$var$Dashicon , Button: $41c8934c3a7e6aba$var$Button  } = wp.components;
const { addFilter: $41c8934c3a7e6aba$var$addFilter  } = wp.hooks;
const { __: $41c8934c3a7e6aba$var$__  } = wp.i18n; // register control panel
const $41c8934c3a7e6aba$var$withExtendedControl = $41c8934c3a7e6aba$var$createHigherOrderComponent((BlockEdit)=>{
    return (props)=>{
        // Do nothing if it's another block than our defined ones.
        if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name)) return /*#__PURE__*/ React.createElement(BlockEdit, props);
        const { attributes: { blockId: blockId , currentResponsiveTab: currentResponsiveTab , parsedCSSString: parsedCSSString , parsedCSS: parsedCSS  } , setAttributes: setAttributes  } = props; // check and generate unique persistent block id (clientId is not persistent!)
        if (blockId === "" || typeof blockId === "undefined" || (0, $20b4a97a61b3fccb$export$ccc9fe24e363c71e)(props) === true) {
            // replace old block ID with new one if block is a duplicate
            const newBlockId = (0, $20b4a97a61b3fccb$export$aea206c5be40c027)(props); // also do this for the parsed css
            let _parsedCSSString = parsedCSSString;
            let _parsedCSS = JSON.parse(parsedCSS);
            if ((0, $20b4a97a61b3fccb$export$ccc9fe24e363c71e)(props)) {
                _parsedCSSString = parsedCSSString.replaceAll(blockId, newBlockId);
                Object.entries(_parsedCSS).forEach(([key, value])=>{
                    _parsedCSS[key] = value.replaceAll(blockId, newBlockId);
                });
            }
            _parsedCSS = JSON.stringify(_parsedCSS);
            setAttributes({
                blockId: newBlockId,
                parsedCSSString: _parsedCSSString,
                parsedCSS: _parsedCSS
            });
        } else // inject editor css
        (0, $20b4a97a61b3fccb$export$ce14e686d8283ef)(props);
         // detect if mouse is over panel
        const panel = document.querySelector(".sv100-premium-extended-controls-panel");
        if (panel) {
            panel.addEventListener("mouseover", function() {
                panel.classList.add("panel-hover");
            });
            panel.addEventListener("mouseleave", function() {
                panel.classList.remove("panel-hover");
            });
        } // detect arrow keys left / right to change breakpoint
        document.onkeydown = function(e) {
            const tabs = document.querySelectorAll(".sv100-premium-extended-controls-panel.panel-hover > .sv100-premium-panelbody > .components-tab-panel__tabs > button");
            if (tabs && document.activeElement) {
                let allowed = true; // prevent arrow function while focus is on text or number input field
                if ([
                    "input"
                ].indexOf(document.activeElement.tagName.toLowerCase()) !== -1 && [
                    "text",
                    "number"
                ].indexOf(document.activeElement.getAttribute("type")) !== -1) allowed = false;
                if (allowed === true) {
                    for(let i = 0; i < tabs.length; i++)if (tabs[i].classList.contains("is-active")) {
                        if (e.key === "ArrowLeft" && i > 0) {
                            tabs[i - 1].click();
                            break;
                        }
                        if (e.key === "ArrowRight" && i < tabs.length) {
                            tabs[i + 1].click();
                            break;
                        }
                    }
                }
            }
        };
        return /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$Fragment, null, /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$InspectorControls, {
            className: "sv100-premium-extended-controls-panel"
        }, /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$PanelBody, {
            title: $41c8934c3a7e6aba$var$__("SV100 Premium - Extended Controls", "sv100_premium"),
            initialOpen: true,
            className: "sv100-premium-extended-controls-panel"
        }, /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$TabPanel, {
            className: "sv100-premium-panelbody",
            tabs: [
                {
                    name: "Mobile",
                    title: /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$Dashicon, {
                        icon: "smartphone"
                    }),
                    className: "tab-icon"
                },
                {
                    name: "MobileLandscape",
                    title: /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$Dashicon, {
                        icon: "smartphone",
                        style: {
                            transform: "rotate(90deg)"
                        }
                    }),
                    className: "tab-icon"
                },
                {
                    name: "Tablet",
                    title: /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$Dashicon, {
                        icon: "tablet"
                    }),
                    className: "tab-icon"
                },
                {
                    name: "TabletLandscape",
                    title: /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$Dashicon, {
                        icon: "tablet",
                        style: {
                            transform: "rotate(90deg)"
                        }
                    }),
                    className: "tab-icon"
                },
                {
                    name: "TabletPro",
                    title: /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$Dashicon, {
                        icon: "tablet",
                        style: {
                            color: "red"
                        }
                    }),
                    className: "tab-icon"
                },
                {
                    name: "TabletProLandscape",
                    title: /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$Dashicon, {
                        icon: "tablet",
                        style: {
                            transform: "rotate(90deg)",
                            color: "red"
                        }
                    }),
                    className: "tab-icon"
                },
                {
                    name: "Desktop",
                    title: /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$Dashicon, {
                        icon: "desktop"
                    }),
                    className: "tab-icon"
                }
            ]
        }, (tab)=>{
            let output = setAttributes({
                currentResponsiveTab: tab.name
            });
            return /*#__PURE__*/ React.createElement("div", null, output);
        }), /*#__PURE__*/ React.createElement($41c8934c3a7e6aba$var$Fragment, null, /*#__PURE__*/ React.createElement((0, $18aec67ac328bd86$export$2e2bcd8739ae039), props)))), /*#__PURE__*/ React.createElement(BlockEdit, props));
    };
}, "withExtendedControl");
$41c8934c3a7e6aba$var$addFilter("editor.BlockEdit", "sv100-premium/gutenberg-extended-block-controls", $41c8934c3a7e6aba$var$withExtendedControl); // register custom attributes
const $41c8934c3a7e6aba$var$addCustomControlAttributes = (settings, name)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(name)) return settings;
    Object.assign(settings.attributes, {
        blockId: {
            type: "string"
        },
        parsedCSS: {
            type: "string",
            default: "{}"
        },
        parsedCSSString: {
            type: "string",
            default: ""
        },
        _classNamesList: {
            type: "array",
            default: []
        },
        _regenerateCSS: {
            type: "boolean",
            default: false
        },
        _regenerateCSSList: {
            type: "array",
            default: []
        }
    });
    return settings;
};
$41c8934c3a7e6aba$var$addFilter("blocks.registerBlockType", "sv100-premium/gutenberg-extended-block-controls", $41c8934c3a7e6aba$var$addCustomControlAttributes); // add block id
const $41c8934c3a7e6aba$var$withClientIdClassName = $41c8934c3a7e6aba$var$createHigherOrderComponent((BlockListBlock)=>{
    return (props)=>{
        if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(props.name)) return /*#__PURE__*/ React.createElement(BlockListBlock, props);
         // old way
        let classNames = "sv100-premium-block-core-" + props.attributes.blockId;
        if (typeof props.attributes.stretchLink !== "undefined" && props.attributes.stretchLink === true) classNames += " sv100-premium-extended-controls-stretch-link";
         // new way
        const _classNamesList = typeof props.attributes._classNamesList !== "undefined" ? props.attributes._classNamesList : [];
        for(let i = 0; i < _classNamesList.length; i++)classNames += " " + _classNamesList[i];
        return /*#__PURE__*/ React.createElement(BlockListBlock, $41c8934c3a7e6aba$var$_extends({}, props, {
            className: classNames
        }));
    };
}, "withCustomClassName");
wp.hooks.addFilter("editor.BlockListBlock", "sv100-premium/gutenberg-extended-block-controls", $41c8934c3a7e6aba$var$withClientIdClassName); // add blockid-class to props
//@todo move this function completely to the php block render function
const $41c8934c3a7e6aba$var$addCustomProps = (props, blockType, attributes)=>{
    // Do nothing if it's another block than our defined ones.
    if (!(0, $20b4a97a61b3fccb$export$48c17662a6902497)(blockType.name)) return props;
     // Use Lodash's assign to gracefully handle if attributes are undefined
    if (typeof attributes.blockId !== "undefined") {
        let classNames = typeof props.className === "undefined" ? "" : props.className; // paragraphs, list, headings
        // old way
        if (classNames === "") classNames += "sv100-premium-block-core-" + attributes.blockId;
        else classNames += " sv100-premium-block-core-" + attributes.blockId;
        if (typeof attributes.stretchLink !== "undefined" && attributes.stretchLink === true) classNames += " sv100-premium-extended-controls-stretch-link";
         // new way
        const _classNamesList = typeof attributes._classNamesList !== "undefined" ? attributes._classNamesList : [];
        for(let i = 0; i < _classNamesList.length; i++)classNames += " " + _classNamesList[i];
        Object.assign(props, {
            className: classNames
        });
    }
    return props;
};
$41c8934c3a7e6aba$var$addFilter("blocks.getSaveContent.extraProps", "sv100-premium/gutenberg-extended-block-controls", $41c8934c3a7e6aba$var$addCustomProps);




//# sourceMappingURL=index.js.map
