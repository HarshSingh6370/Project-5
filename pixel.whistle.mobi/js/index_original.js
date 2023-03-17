window.onload = async function sendJSON() {
    window.flag2Trigger = true;
    window.ads_count = 0;
    window.publisher_flag = 0;
    window.visible_count = 0;
    window.times_api_called = 1;
    window.creatives_shown = [];
    window.publisher_verified;
    window.firstApiCall = true;
    window.vi = viewable_imp;
    window.impression_duration = impression_duration;
    var current_url = new URL(window.location.href);
    window.apiToken = current_url.searchParams.get("apiToken");
    parenturl_data = decodeURIComponent(current_url.searchParams.get("parenturl"));
    window.parenturl = parenturl_data;
    var category = current_url.searchParams.get("size");
    window.adsSize = 3;
    window.parentUrl = (window.location != window.parent.location) ?
        document.referrer :
        document.location.href;
    window.bid_price = bid_price;
    window.language = language;
    if (category != null) {
        if (category == "tre") {
            window.adsSize = 2;
        } else if (category == "due") {
            window.adsSize = 1;
        } else if (category == "quarto") {
            window.adsSize = 3;
        } else if (category == "6") {
            window.adsSize = 6;
        }
    }
    // var non_vieawble_impressions_url = impression_api_url + window.apiToken + "&auth_url=" + window.parentUrl;
    // non_vieable_impression(non_vieawble_impressions_url);
    // fetching tokenID & ads size from new script
    if (window.apiToken == null) {
        window.apiToken = publisher_token;
        window.adsSize = (typeof parseInt(script_code_size) !== 'undefined' && parseInt(script_code_size)) ? parseInt(script_code_size) : 3;
        window.parenturl = window.parentUrl = (typeof parenturl_data !== 'undefined' && parenturl_data) ? parent_url : parenturl_data;
    }
    // web-view horizontal view 3 section (ui-suhas)
    webView_horizontal_token.forEach(data => {
        if (window.apiToken == data) document.getElementById('container_customize').classList.add("webDesignView");
    });
    // if two ads is there change to new design make it one big ad (ui-suhas)
    if (script_code_size == '2' && twoAdsNewDesign) {
        document.getElementById('container_customize').classList.add("newDesignForTwoAds");
        window.adsSize = 1;
        // add 2 big ads
        if (document.querySelectorAll(".newDesignForFourAds").length || script_class == 'enabled2Ads') window.adsSize = 2;
    }
    // remove Sponsored text besed on apiToken (ui-suhas)
    let getWebId = window.apiToken.split('_')[1];
    sponsoredTagExclude.forEach(data => {
        if (getWebId == data) document.getElementById('container_customize').classList.add("removeSponsored");
    });
    // voot app and web designs(320x50)(728x90)(970x90) besed on apiToken (ui-suhas)
    vootAppDesign.forEach(data => {
        if (getWebId == data) document.getElementById('container_customize').classList.add("vootAppDesign");
    });
    // esakal app and web designs(320x50) besed on apiToken (ui-suhas)
    esakalAppDesign.forEach(data => {
        if (getWebId == data) document.getElementById('container_customize').classList.add("esakalDesign");
    });

    //capturing the data begins.
    'use strict';
    var module = {
        options: [],
        header: [navigator.userAgent, navigator.vendor, window.opera],
        dataos: [{
                name: 'Windows Phone',
                value: 'Windows Phone',
                version: 'OS'
            },
            {
                name: 'Windows',
                value: 'Win',
                version: 'NT'
            },
            {
                name: 'iPhone',
                value: 'iPhone',
                version: 'OS'
            },
            {
                name: 'iPad',
                value: 'iPad',
                version: 'OS'
            },
            {
                name: 'Kindle',
                value: 'Silk',
                version: 'Silk'
            },
            {
                name: 'Android',
                value: 'Android',
                version: 'Android'
            },
            {
                name: 'PlayBook',
                value: 'PlayBook',
                version: 'OS'
            },
            {
                name: 'BlackBerry',
                value: 'BlackBerry',
                version: '/'
            },
            {
                name: 'Macintosh',
                value: 'Mac',
                version: 'OS X'
            },
            {
                name: 'Linux',
                value: 'Linux',
                version: 'rv'
            },
            {
                name: 'Palm',
                value: 'Palm',
                version: 'PalmOS'
            }
        ],
        init: function() {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos);
            return {
                os: os
            };
        },
        matchItem: function(string, data) {
            var i = 0,
                regex,
                match;
            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    return {
                        name: data[i].name
                    };
                }
            }
        }
    };
    var e = module.init();
    window.os_name = e.os.name
    //capturing user Data ends here
    getAds(0);
    let adBlockIni = document.getElementById('container_customize');
    adBlockIni.classList.add("removeAnimation");
};
// viewable impresstion ads on scroll event (ui-suhas)
function scrollEvents() {
    if (this.frameElement == null) {
        let adBlockIni = document.getElementById('container_customize');
        window.addEventListener('scroll', function() {
            if (adBlockIni.getBoundingClientRect().top - this.innerHeight + adBlockIni.offsetHeight / 2 < 0 && window.firstApiCall) {
                window.firstApiCall = false;
                startImpressionTracking(window.ads_data_value);
            }
        });
    } else if (this.parent.frameElement != null && (this.parent.frameElement.id.includes('google_ads_iframe_') || this.parent.frameElement.id.includes('whistleFeed'))) {
        let iframePositionIni = this.parent.frameElement;
        window.parent.parent.addEventListener('scroll', function() {
            if (iframePositionIni.getBoundingClientRect().top - this.innerHeight + iframePositionIni.offsetHeight / 2 < 0 && window.firstApiCall) {
                window.firstApiCall = false;
                startImpressionTracking(window.ads_data_value);
            }
        });
    } else if (this.frameElement != null && (this.frameElement.id.includes('google_ads_iframe_') || this.frameElement.id.includes('whistleFeed'))) {
        let iframePositionIni = this.frameElement;
        window.parent.addEventListener('scroll', function() {
            if (iframePositionIni.getBoundingClientRect().top - this.innerHeight + iframePositionIni.offsetHeight / 2 < 0 && window.firstApiCall) {
                window.firstApiCall = false;
                startImpressionTracking(window.ads_data_value);
            }
        });
    }
}
// viewable impresstion ads on page load (ui-suhas)
function pageLoadEvents() {
    let thisVal = this;
    if (window.firstApiCall && window.ads_data_value != undefined) {
        if (thisVal.frameElement == null) {
            let adBlock = document.getElementById('container_customize');
            if (adBlock.getBoundingClientRect().top - this.innerHeight + adBlock.offsetHeight / 2 < 0) {
                window.firstApiCall = false;
                startImpressionTracking(window.ads_data_value);
            }
        } else if (thisVal.parent.frameElement != null && (thisVal.parent.frameElement.id.includes('google_ads_iframe_') || thisVal.parent.frameElement.id.includes('whistleFeed'))) {
            let iframePosition = thisVal.parent.frameElement;
            if (iframePosition.getBoundingClientRect().top - this.parent.parent.innerHeight + iframePosition.offsetHeight / 2 < 0) {
                window.firstApiCall = false;
                startImpressionTracking(window.ads_data_value);
            }
        } else if (thisVal.frameElement != null && (thisVal.frameElement.id.includes('google_ads_iframe_') || thisVal.frameElement.id.includes('whistleFeed'))) {
            let iframePosition = thisVal.frameElement;
            if (iframePosition.getBoundingClientRect().top - this.parent.innerHeight + iframePosition.offsetHeight / 2 < 0) {
                window.firstApiCall = false;
                startImpressionTracking(window.ads_data_value);
            }
        }
    }
}

function getAds(data) {
    let xhr = new XMLHttpRequest();
    //let url = "https://whistle.mobi/Display_ads_api/fetchAllAssetDetailsGallery";
    let url = ads_url + "Display_ads_api/displayAdsApi";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = async function() {
        if (xhr.readyState === 4 && xhr.status === 200 && this.response != "") {
            var response = JSON.parse(this.response);
            window.ads_count = response['data']['data'].length;
            window.ads_data_value = response['data']['data'] != undefined ? response['data']['data'] : 0;
            if (data == 1) trackingAds(window.ads_data_value);
            if (response['status'] == '200' && window.ads_count != 0) {
                add_data_to_pixel(response['data']['data'], window.adsSize, response['data']['pub_token']);
                //Total Impressions (Viewable + Non Viewable)
                if (window.flag2Trigger) {
                    var non_vieawble_impressions_url = impression_api_url + window.apiToken + "&auth_url=" + window.parentUrl;
                    non_vieable_impression(non_vieawble_impressions_url);
                    window.flag2Trigger = false;
                    setTimeout(() => {
                        pageLoadEvents();
                        scrollEvents();
                    }, 500);
                }
            } else {
                var cont = document.getElementsByClassName('bo')[0];
                cont.innerHTML = response['data']['passback_tag'];
            }
        }
    };
    var userData = JSON.stringify({
        "os_name": window.os_name,
        "publisher_token": window.apiToken,
        "api_called": window.times_api_called,
        "size": window.adsSize,
        "parentUrl": window.parentUrl,
        "language": window.language,
        "bid_price": window.bid_price,
        "clicked_campaign_ids": ''
    });
    // Sending data with the request
    xhr.send(userData);
    window.times_api_called += 1;
};

function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function add_data_to_pixel(obj, adsSize, pub_token) {
    window.visible_count = 0;
    var cont = document.getElementById('container');
    //Deleting the elements in the biginning
    cont.innerHTML = '<p class="sponsored_txt"><em><b>Whistle</b></em>&nbsp;Feed | Sponsored</p>';
    // create ol element and set the attributes.
    var ol = document.createElement('ol');
    var ol2 = document.createElement('ol');
    var ol3 = document.createElement('ol');
    var ol4 = document.createElement('ol');
    ol.setAttribute('class', 'cube');
    ol2.setAttribute('class', 'cube cube2');
    var j = 1;
    if (adsSize == 4) {
        ol3.setAttribute('class', 'cube cube3');
        ol4.setAttribute('class', 'cube cube4');
        while (j <= 16) {
            for (i = 0; i <= obj.length - 1; i++) {
                var li = document.createElement('li');
                if (j <= 4) {
                    k = 1;
                } else if (j > 4 && j <= 8) {
                    k = 2;
                } else if (j > 8 && j <= 12) {
                    k = 3;
                } else if (j > 12 && j <= 16) {
                    k = 4;
                }
                li.innerHTML = '<a style="text-decoration:none;" rel="nofollow noopener sponsored" href="' + obj[i]['tracker'] + "&token=" + pub_token + "&unique_id=" + obj[i]['unique_click_id'] + "&auth_url=" + window.parenturl + "&campaign_id=" + obj[i]['campaign_id'] + '" target="_blank" ping="%%CLICK_URL_UNESC%%"><div data-id="' + obj[i]['id'] + '" class="divimage"><h3 class="headlines">' + obj[i]['headline'] + '</h3><div class="cta-flex"> <p class="subTexts">' + obj[i]['subtext'] + '</p>   <button class="go feed_cta_button">' + obj[i]['CTA'] + '</button></div></div> </a><p class="logo-txt">' + obj[i]['brandname'] + '</p> ';
                if (j == 4 || j == 8 || j == 12 || j == 16) {
                    li.setAttribute('class', 'box box' + k);
                    ol4.appendChild(li);
                } else if (j == 3 || j == 7 || j == 11 || j == 15) {
                    li.setAttribute('class', 'box box' + k);
                    ol3.appendChild(li);
                } else if (j == 2 || j == 6 || j == 10 || j == 14) {
                    li.setAttribute('class', 'box box' + k);
                    ol2.appendChild(li);
                } else {
                    li.setAttribute('class', 'box box' + k);
                    ol.appendChild(li);
                }
                j++;
                if (j > 16) {
                    break;
                }
            }
        }
        cont.appendChild(ol);
        cont.appendChild(ol2);
        cont.appendChild(ol3);
        cont.appendChild(ol4);
    } else if (adsSize == 3) {
        ol3.setAttribute('class', 'cube cube3');
        while (j <= 12) {
            for (i = 0; i <= obj.length - 1; i++) {
                var li = document.createElement('li');
                if (j <= 3) {
                    k = 1;
                } else if (j > 3 && j <= 6) {
                    k = 2;
                } else if (j > 6 && j <= 9) {
                    k = 3;
                } else if (j > 9 && j <= 12) {
                    k = 4;
                }
                li.innerHTML = '<a style="text-decoration:none;" rel="nofollow noopener sponsored" href="' + obj[i]['tracker'] + "&token=" + pub_token + "&unique_id=" + obj[i]['unique_click_id'] + "&auth_url=" + window.parenturl + "&campaign_id=" + obj[i]['campaign_id'] + '" target="_blank" ping="%%CLICK_URL_UNESC%%"><div data-id="' + obj[i]['id'] + '" class="divimage"><h3 class="headlines">' + obj[i]['headline'] + '</h3><div class="cta-flex"> <p class="subTexts">' + obj[i]['subtext'] + '</p>   <button class="go feed_cta_button">' + obj[i]['CTA'] + '</button></div></div> </a><p class="logo-txt">' + obj[i]['brandname'] + '</p> ';
                if (j == 3 || j == 6 || j == 9 || j == 12) {
                    li.setAttribute('class', 'box box' + k);
                    ol3.appendChild(li);
                } else if (j == 2 || j == 5 || j == 8 || j == 11) {
                    li.setAttribute('class', 'box box' + k);
                    ol2.appendChild(li);
                } else {
                    li.setAttribute('class', 'box box' + k);
                    ol.appendChild(li);
                }
                j++;
                if (j > 12) {
                    break;
                }
            }
        }
        cont.appendChild(ol);
        cont.appendChild(ol2);
        cont.appendChild(ol3);
    } else if (adsSize == 2) {
        while (j <= 8) {
            for (i = 0; i <= obj.length - 1; i++) {
                var li = document.createElement('li');
                if (j <= 2) {
                    k = 1;
                } else if (j > 2 && j <= 4) {
                    k = 2;
                } else if (j > 4 && j <= 6) {
                    k = 3;
                } else if (j > 6 && j <= 8) {
                    k = 4;
                }
                li.innerHTML = '<a style="text-decoration:none;" rel="nofollow noopener sponsored" href="' + obj[i]['tracker'] + "&token=" + pub_token + "&unique_id=" + obj[i]['unique_click_id'] + "&auth_url=" + window.parenturl + "&campaign_id=" + obj[i]['campaign_id'] + '" target="_blank" ping="%%CLICK_URL_UNESC%%"><div data-id="' + obj[i]['id'] + '" class="divimage"><h3 class="headlines">' + obj[i]['headline'] + '</h3><div class="cta-flex"> <p class="subTexts">' + obj[i]['subtext'] + '</p>   <button class="go feed_cta_button">' + obj[i]['CTA'] + '</button></div></div> </a><p class="logo-txt">' + obj[i]['brandname'] + '</p> ';
                if (j == 2 || j == 4 || j == 6 || j == 8) {
                    li.setAttribute('class', 'box box' + k);
                    ol2.appendChild(li);
                } else {
                    li.setAttribute('class', 'box box' + k);
                    ol.appendChild(li);
                }
                j++;
                if (j > 8) {
                    break;
                }
            }
        }
        cont.appendChild(ol);
        cont.appendChild(ol2);
    } else if (adsSize == 1) {
        while (j <= 4) {
            for (i = 0; i <= obj.length - 1; i++) {
                var li = document.createElement('li');
                if (j <= 1) {
                    k = 1;
                } else if (j > 1 && j <= 2) {
                    k = 2;
                } else if (j > 2 && j <= 3) {
                    k = 3;
                } else if (j > 3 && j <= 4) {
                    k = 4;
                }
                li.innerHTML = '<a style="text-decoration:none;" rel="nofollow noopener sponsored" href="' + obj[i]['tracker'] + "&token=" + pub_token + "&unique_id=" + obj[i]['unique_click_id'] + "&auth_url=" + window.parenturl + "&campaign_id=" + obj[i]['campaign_id'] + '" target="_blank" ping="%%CLICK_URL_UNESC%%"><div data-id="' + obj[i]['id'] + '" class="divimage"><h3 class="headlines">' + obj[i]['headline'] + '</h3><div class="cta-flex"> <p class="subTexts">' + obj[i]['subtext'] + '</p>   <button class="go feed_cta_button">' + obj[i]['CTA'] + '</button></div></div> </a><p class="logo-txt">' + obj[i]['brandname'] + '</p> ';
                if (j == 1 || j == 2 || j == 3 || j == 4) {
                    li.setAttribute('class', 'box box' + k);
                    ol.appendChild(li);
                }
                j++;
                if (j > 8) {
                    break;
                }
            }
        }
        cont.appendChild(ol);
    }
}

function triggerImpression(adsSize, impression_tracker, x) { //Triggering Impressions for Advertisor
    for (i = (adsSize * x); i < adsSize + (adsSize * x); i++) {
        if (impression_tracker[i] != undefined && window.creatives_shown.indexOf(impression_tracker[i]) == -1) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {}
            };
            xhttp.open("POST", impression_tracker[i], true)
            window.creatives_shown.push(impression_tracker[i]);
            xhttp.send();
        }
    }
}

function non_vieable_impression(api_url) { //Triggering Non-Viewable Impressions for publishers.
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", api_url, true)
    xhttp.send();
}

function startImpressionTracking(ads_data) {
    if (ads_data == undefined) return;
    let adBlock = document.getElementById('container_customize');
    adBlock.classList.remove("removeAnimation");
    if (window.firstApiCall == false) {
        window.setInterval(() => {
            getAds(1);
        }, 130000);
    }
    trackingAds(ads_data);
}

function trackingAds(ads_data) {
    var x = 1;
    var impression_tracker = [];
    if (!window.parenturl.includes("https://")) {
        window.parenturl = window.parentUrl;
    }
    for (i = 0; i <= ads_data.length - 1; i++) {
        var impressionTracker = ads_data[i]['tracker'].replace("/d?", "/i?") + "&token=" + window.apiToken + "&flag=0&auth_url=" + window.parenturl;
        impression_tracker.push(impressionTracker);
    }
    //Publisher Impressions 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {}
    };
    xhttp.open("POST", impression_tracker[0].replace("flag=0", "flag=1"), true);
    if (window.publisher_flag != 1) {
        window.publisher_flag = 1;
        xhttp.send();
    }
    //Publisher Impressions Ends.
    //Advertisor Impression
    setTimeout(() => {
        triggerImpression(window.adsSize, impression_tracker, 0);
    }, window.impression_duration);

    var storeData = window.setInterval(function() {
        if (x < 4) {
            triggerImpression(window.adsSize, impression_tracker, x);
        } else {
            clearInterval(storeData);
        }
        x = x + 1;
    }, 35000 + window.impression_duration);
    //Advertisor Impression Ends.
}