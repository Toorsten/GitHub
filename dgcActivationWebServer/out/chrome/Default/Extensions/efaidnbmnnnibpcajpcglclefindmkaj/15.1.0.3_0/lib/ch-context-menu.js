/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/

/*global chrome, document, require, Promise, SETTINGS:true */
/*jslint devel: true, browser: true, nomen: true, maxlen: 90 */

var communicate,
    acom_analytics,
    utilities,
    started,
    startup = new Promise(function (resolve, reject) {
        'use strict';
        started = resolve;
    }),
    startupComplete = false;

// just in case it wasn't set by including settings.js
SETTINGS = SETTINGS || {USE_ACROBAT: true};

chrome.runtime.getPlatformInfo(function (info) {
    'use strict';
    SETTINGS.OS = info.os;
});

function registerActions(evt) {
    'use strict';
	function addQueryParam(list) {
        var list2 = list.splice(), i;
        for (i = 0; i < list.length; i += 1) {
            list2.push(list[i] + "?*");
        }
    }

    var web2pdf = function () { return communicate.getModule("acro-web2pdf"); },
        gstate = function () { return communicate.getModule("acro-gstate"); },
        i,
        context,
        title,
        link_id,
        contexts,
        pdfURL = ["*://*/*.pdf"],
        image_id,
        links = ["link"],
        images = ["image"],
        pdf_id,
        all = ["all"],
        flickr_id,
        toPDFURLs = [
            '*://*/*.ai',
            '*://*/*.bmp',
            '*://*/*.doc',
            '*://*/*.docx',
            '*://*/*.gif',
            '*://*/*.indd',
            '*://*/*.jpeg',
            '*://*/*.jpg',
            '*://*/*.odf',
            '*://*/*.odg',
            '*://*/*.odp',
            '*://*/*.ods',
            '*://*/*.odt',
            '*://*/*.png',
            '*://*/*.ppt',
            '*://*/*.pptx',
            '*://*/*.pptx',
            '*://*/*.ps',
            '*://*/*.psd',
            '*://*/*.pub',
            '*://*/*.rtf',
            '*://*/*.stw',
            '*://*/*.sxd',
            '*://*/*.sxc',
            '*://*/*.sxi',
            '*://*/*.sxw',
            '*://*/*.text',
            '*://*/*.tif',
            '*://*/*.tiff',
            '*://*/*.txt',
            '*://*/*.xls',
            '*://*/*.xlsx'
        ],
        allURLs = addQueryParam(toPDFURLs.concat(pdfURL));

    function checkOS() {
        chrome.runtime.getPlatformInfo(function (info) {
            var ver;

            SETTINGS.OS = info.os;
            SETTINGS.CHROME_VERSION = 0;
            SETTINGS.EXTENSION_VERSION = 0;
            try {
                ver = navigator.userAgent.match(/Chrome\/([0-9]+)/);
                if (ver) {
                    SETTINGS.CHROME_VERSION = +ver[1];
                }
            } catch (e1) {}
            try {
                SETTINGS.EXTENSION_VERSION = chrome.runtime.getManifest().version;
            } catch (e2) {}
            if (info.os === "mac") {
                acom_analytics.event(acom_analytics.e.OS_MAC_OP);
            } else if (info.os === "win") {
                acom_analytics.event(acom_analytics.e.OS_WIN_OP);
            }
        });
    }
    if (startupComplete) {
        return;
    }

    startupComplete = true;
    startup.then(
        function (analytics) {
            checkOS();
            if (!evt) {
                analytics.event(analytics.e.EXTENSION_STARTUP);
            } else {
                if (evt.reason === "update") {
                    analytics.event(analytics.e.EXTENSION_UPDATE);

                } else if (evt.reason === "install") {
                    analytics.event(analytics.e.EXTENSION_INSTALLED);
                }
            }
            chrome.browserAction.onClicked.addListener(function (tab) {
                communicate.echo(tab);
            });
        }
    );

    function getLocaleString(keyStr) {
        var str;
        if (!utilities || !utilities.getTranslation) {
            str = chrome.i18n.getMessage(keyStr);
        } else {
            str = utilities.getTranslation(keyStr);
        }
        return str;
    }

    function getTitle(tab) {
        var title = tab.title ||
            getLocaleString("web2pdfUntitledFileName");

        return title.replace(/[<>?:|\*"\/\\'&\.]/g, "");
    }

    function ConvertToPDFContextMenu(info, tab) {
        acom_analytics.event(acom_analytics.e.CONTEXT_MENU_CONVERT_PAGE);
        web2pdf().handleConversionRequest(
            {
                tabId       : tab.id,
                caller      : gstate().web2pdfCaller.MENU,
                action      : gstate().web2pdfAction.CONVERT,
                context     : gstate().web2pdfContext.PAGE,
                url         : info.pageUrl || tab.url,
                domtitle    : getTitle(tab)
            }
        );
    }

    function AppendToExistingPDFContextMenu(info, tab) {
        acom_analytics.event(acom_analytics.e.CONTEXT_MENU_APPEND_PAGE);
        web2pdf().handleConversionRequest(
            {
                tabId       : tab.id,
                caller      : gstate().web2pdfCaller.MENU,
                action      : gstate().web2pdfAction.APPEND,
                context     : gstate().web2pdfContext.PAGE,
                url         : info.pageUrl || tab.url,
                domtitle    : getTitle(tab)
            }
        );
    }

    function ConvertLinkTargetToPDFContextMenu(info, tab) {
        acom_analytics.event(acom_analytics.e.CONTEXT_MENU_CONVERT_LINK);
        web2pdf().handleConversionRequest(
            {
                tabId       : tab.id,
                caller      : gstate().web2pdfCaller.MENU,
                action      : gstate().web2pdfAction.CONVERT,
                context     : gstate().web2pdfContext.LINK,
                url         : info.linkUrl,
                domtitle    : getTitle(tab)
            }
        );
    }

    function AppendLinkTargetToExistingPDFContextMenu(info, tab) {
        acom_analytics.event(acom_analytics.e.CONTEXT_MENU_APPEND_LINK);
        web2pdf().handleConversionRequest(
            {
                tabId       : tab.id,
                caller      : gstate().web2pdfCaller.MENU,
                action      : gstate().web2pdfAction.APPEND,
                context     : gstate().web2pdfContext.LINK,
                url         : info.linkUrl,
                domtitle    : getTitle(tab)
            }
        );
    }
    if (!SETTINGS.IS_READER && SETTINGS.USE_ACROBAT) {
        /**
         * Create a context menus which will show up for page content.
         */
		chrome.contextMenus.create(
            {
                "title"     : getLocaleString("web2pdfConvertPageContextMenu"),
                "contexts"  : ["page"],
                "onclick"   : ConvertToPDFContextMenu
            }
        );
        chrome.contextMenus.create(
            {
                "title"     : getLocaleString("web2pdfAppendPageContextMenu"),
                "contexts"  : ["page"],
                "onclick"   : AppendToExistingPDFContextMenu
            }
        );

        /**
         * Create a context menus which will show up for links.
         */
        chrome.contextMenus.create(
            {
                "title": getLocaleString("web2pdfConvertLinkContextMenu"),
                "contexts": ["link"],
                "onclick": ConvertLinkTargetToPDFContextMenu
            }
        );
        chrome.contextMenus.create(
            {
                "title": getLocaleString("web2pdfAppendLinkContextMenu"),
                "contexts": ["link"],
                "onclick": AppendLinkTargetToExistingPDFContextMenu
            }
        );

    } else if (!SETTINGS.IS_READER) {
        title = "Adobe PDF";
        pdf_id = chrome.contextMenus.create(
            {
                "title": title,
                "contexts": all,
                "id": "pdf-page"
            }
        );
        chrome.contextMenus.create(
            {
                "title": "Upload PDF to acrobat.com",
                "contexts": all,
                "parentId": pdf_id,
                "id": "upload",
                documentUrlPatterns: pdfURL
            }
        );
        chrome.contextMenus.create(
            {
                "title": "Upload and export to Word/Excel/PowerPoint/Images",
                "contexts": all,
                "parentId": pdf_id,
                "id": "export",
                documentUrlPatterns: pdfURL
            }
        );
        chrome.contextMenus.create(
            {
                "title": "Upload link to acrobat.com",
                "contexts": links,
                "parentId": pdf_id,
                "id": "upload_link",
                targetUrlPatterns: allURLs
            }
        );
        chrome.contextMenus.create(
            {
                "title": "Upload image to acrobat.com",
                "contexts": images,
                "parentId": pdf_id,
                "id": "upload-image"
            }
        );

        chrome.contextMenus.create(
            {
                "title": "Create a Slideshow from a Flickr album",
                "contexts": all,
                "parentId": pdf_id,
                "id": "flickr-slideshow",
                documentUrlPatterns: ["*://www.flickr.com/*"]
            }
        );
        chrome.contextMenus.create(
            {
                "title": "Create a contact sheet from Flickr images",
                "contexts": all,
                "parentId": pdf_id,
                "id": "flickr-contact-sheet",
                documentUrlPatterns: ["*://www.flickr.com/*"]
            }
        );
    }
}


require([
    "communicate",
    "util",
    "upload",
    "download-manager",
    "analytics",
    "acro-gstate",
    "acro-actions",
    "acro-web2pdf",
    "session",
    "convert-to-zip"
], function (com,
              util,
              upload,
              downloadManager,
              analytics,
              acroGstate,
              acroActions,
              acroWeb2pdf) {
    'use strict';

    function fte(analytics) {
        var fteURL = SETTINGS.OS === "mac" ?
                "data/js/options.html?os=mac" :
                "https://adobe.com/go/chromeextensionfirstlaunch";

        if (util.getCookie("fte") !== "false") {
            util.createTab(
                fteURL,
                function () {
                    util.setCookie("fte", "false", 3650);
                    analytics.event(analytics.e.FTE_LAUNCH);
                }
            );
        }
    }
	
	function getLocaleStringForToolTip(keyStr) {
        var str;
        if (!utilities || !utilities.getTranslation) {
            str = chrome.i18n.getMessage(keyStr);
        } else {
            str = utilities.getTranslation(keyStr);
        }
        return str;
    }
	
	function changeToolTipMessageForReader(shim_ver) {
        if (shim_ver === SETTINGS.ERP_READER_VER) {
            chrome.browserAction.setTitle({title:
					getLocaleStringForToolTip("web2pdfConvertButtonToolTipERPReader")});
		} else {
            chrome.browserAction.setTitle({title:
                    getLocaleStringForToolTip("web2pdfConvertButtonToolTipReader")});
		}
    }
		
    chrome.management.getSelf(
        function (env) {
            if (!analytics.s) {
                analytics.init(
                    env.version,
                    env.installType
                );
            }
			//we do not want to show the context menu web capture options 
            //in case we are dealing with Acrobat Reader
			//also we want to preserve the existing 
            //default implementation in case of Acrobat.
            acroActions.getVersion(
                function versionResponse(ver) {
                    if (ver === SETTINGS.READER_VER || ver === SETTINGS.ERP_READER_VER) {
				        SETTINGS.IS_READER = true;
						if (ver === SETTINGS.ERP_READER_VER) {
							SETTINGS.IS_ERP_READER = true;
						}
						changeToolTipMessageForReader(ver);
                    }
					registerActions();
                    started(analytics);
                }
            );
            fte(analytics);
        }
    );

    acom_analytics = analytics;
    communicate = com;
    utilities = util;
    function contextMenuClick(info, tab) {
        var request = {
            filename: tab.title,
            tabId: tab.id,
            menuItem: info.menuItemId,
            handleResult: "preview"
        };
        if (info.menuItemId === "flickr-slideshow" ||
                info.menuItemId === "flickr-contact-sheet") {
            analytics.event(request, analytics.e.FLICKR_CONTEXT_CLICK);
            communicate.deferMessage({panel_op: "flickr", tabId: tab.id});
            return;
        }
        if (info.menuItemId === "upload-image") {
            analytics.setOp("Image");
            request.handleResult = "image_preview";
            request.url = info.srcUrl;
        }
        if (info.menuItemId === "upload_link") {
            analytics.setOp("Link");
            request.url = info.linkUrl;
        }
        if (info.menuItemId === "upload") {
            analytics.setOp("Link");
            request.url = info.linkUrl;
        }
        if (info.menuItemId === "pdf-page") {
            analytics.setOp("PdfPage");
            request.url = info.pageUrl;
        }
        if (request.filename.length > 20) {
            request.filename = request.filename.substring(0, 19);
        }
        if (info.linkUrl) {
            request.filename = info.linkUrl.split("/").splice(-1)[0].replace(/\?\S*/, "");
        } else if (info.srcUrl) {
            request.url = info.srcUrl;
            request.filename = info.srcUrl.split("/").splice(-1)[0].replace(/\?\S*/, "");
        }
        if (info.menuItemId === "export") {
            request.handleResult = "export";
        }

        downloadManager.proxy(downloadManager.do_upload(request));
    }
    if (!SETTINGS.USE_ACROBAT) {
        chrome.contextMenus.onClicked.addListener(contextMenuClick);
    }
    chrome.runtime.onMessage.addListener(communicate.proxy(communicate.handler));
});

chrome.runtime.onInstalled.addListener(registerActions);
