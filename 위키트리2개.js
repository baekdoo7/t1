<script type="text/javascript" src="//compasscdn.adop.cc/js/prebid1_15.js" async></script>
<script type="text/javascript" src="//compasscdn.adop.cc/js/prebidadop1_15.js" ></script>
<script>
    pbjs.floor_price = 0.5;
    pbjs.bidtrace = true;
    pbjs.que.push(function() {
        var adUnits = [{
                "code": "fc2f1b1b-7799-45c5-bc15-a71d1d3cf746",
                "mediaTypes": {
                    "banner": {
                        "sizes": [[300, 250]]
                    }
                },
                "bids": [{
                    "bidder": "oftmedia",
                    "params": {
                        "placementId": "14693422"
                    }},{
                    "bidder": "audienceNetwork",
                    "params": {
                        "placementId": "1858486981115843_2001275460170327"
                    }}
                ]
            },
            {
                "code": "af5237cf-346c-41eb-937a-58edd7be6744",
                "mediaTypes": {
                    "banner": {
                        "sizes": [[300, 250]]
                    }
                },
                "bids": [{
                    "bidder": "oftmedia",
                    "params": {
                        "placementId": "14684273"
                    }},{
                    "bidder": "audienceNetwork",
                    "params": {
                        "placementId": "1858486981115843_1902559400041934"
                    }}
                ]
            }
        ];
        pbjs.addAdUnits(adUnits);
        pbjs.requestBids({
            bidsBackHandler: floorPrice001
        });
    });
</script>