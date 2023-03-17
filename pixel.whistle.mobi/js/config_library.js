var ads_url = "https://feed-api.whistle.mobi/";
var impression_duration = 5000; // is the duration after which its considered an impressions for the Advertisor (As per IAB Standard).
var impression_api_url = "https://hooks.feed.whistle.mobi/i?alias=10&flag=2&token=";
var webView_horizontal_token = ['22991668578924RVUtih_3290', '22991668578924RVUtih_3294']; // ui 3 horizontal ads webview (ui-suhas)
var twoAdsNewDesign = true; // if two ads is there change to new design make it one big ad
var sponsoredTagExclude = ['3566', '3564', '3563', '3562', '3561', '3560', '3559', '3558', '3557', '3556', '3555', '3554', '1019', '3552', '3553']; // remove sponsored text
var vootAppDesign = ['3606', '3605']; // voot app and web designs(320x50)(728x90)(970x90) besed on apiToken (ui-suhas)
var esakalAppDesign = ['3617', '3629', '3631']; // esakal app and web designs(320x50) besed on apiToken (ui-suhas)
var newDesignForFourAds = ['3371', '3627', '3383', '3618', '3619', '3620', '3382', '3621', '3298', '3622', '3310', '3623', '3624', '3625']; // two big ads