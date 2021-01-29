import express from 'express'
import Address from './../models/Address'
const router = express.Router({});

router.post('/web/xlmc/api/address/add', (req, res, next) => {
    const {user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode} = req.body;
    if(user_id){
        const address = new Address({
            user_id,
            address_name,
            address_phone,
            address_area,
            address_area_detail,
            address_post_code,
            address_tag,
            province,
            city,
            county,
            areaCode
        });
        address.save((err, result) => {
            if (err) {
                return next(Error(err));
            }
            res.send({
                success_code: 200,
                data: result,
                message: '新增成功'
            })
        })
    }else {
        return next(Error('非法用户！'));
    }
});

router.post('/web/xlmc/api/address/edit', (req, res, next) => {
    const {address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode} = req.body;
    if(user_id){
        Address.findById(address_id, (err, address)=>{
            if(err){
                return next(err);
            }
            // 2.1 修改文档的内容
            address.address_name = address_name;
            address.address_phone = address_phone;
            address.address_area = address_area;
            address.address_area_detail = address_area_detail;
            address.address_post_code = address_post_code;
            address.address_tag = address_tag;
            address.province = province;
            address.city = city;
            address.county = county;
            address.areaCode = areaCode;

            // 2.2 保存
            address.save((err, result)=>{
                if(err){
                    return next(err);
                }
                res.json({
                    success_code: 200,
                    result: '地址修改成功!'
                })
            });
        });
    }else {
        return next(Error('非法用户！'));
    }
});

router.get('/web/xlmc/api/address/del/:addressid', (req, res, next)=>{
    Address.deleteOne({_id: req.params.addressid}, (err, result)=>{
        if(err){
            return next(err);
        }
        // 数据返回
        res.json({
            success_code: 200,
            result: '成功删除该地址!'
        })
    })
});

/**
 * 获取地址数据
 */
router.get('/web/xlmc/api/address/search/:userid', (req, res) => {
    const user_id = req.params.userid;
    if(user_id){
        Address.find({user_id}).exec((err, result)=>{
            if(err){
                return next(err);
            }
            res.json({
                success_code: 200,
                data: result
            });
        });
    }else {
        return next(Error('非法用户！'));
    }
});

/**
 * 获取单条地址
 */
router.post('/web/xlmc/api/address/one', (req, res, next) => {
    const {user_id, address_id} = req.body;
    if(user_id){
        Address.findOne({_id: address_id, user_id}, (err, result) => {
            if (err) return next(Error(err));
            if (result) {
                res.json({
                    success_code: 200,
                    data: result
                });
            } else {
                res.send({
                    error_code: 0,
                    message: '没有该条地址信息'
                })
            }
        });
    }else {
        return next(Error('非法用户！'));
    }
});


router.get('/web/xlmc/api/homeApi/categories', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({
        "success": true,
        "code": 0,
        "msg": "ok",
        "data": {
            "cate": [
                {
                    "id": "recommend",
                    "name": "推荐"
                },
                {
                    "id": "58fd69dc936edf42508b48de",
                    "name": "安心蔬菜"
                },
                {
                    "id": "590c1928936edf767a8daa6f",
                    "name": "豆制品"
                },
                {
                    "id": "595edd01916edf5011ca395d",
                    "name": "新鲜水果"
                },
                {
                    "id": "58fefa38916edf9b128b45fc",
                    "name": "肉禽蛋"
                },
                {
                    "id": "58fefb94936edf5f5d8b4767",
                    "name": "海鲜水产"
                },
                {
                    "id": "58ff04e6936edfc57a8b464f",
                    "name": "乳品烘焙"
                },
                {
                    "id": "5ab06a0845cd42b3598bfa55",
                    "name": "营养早餐"
                },
                {
                    "id": "5cd53472b0055a0b517a9d97",
                    "name": "叮咚心选"
                },
                {
                    "id": "58ff04c5936edf777a8b46af",
                    "name": "米面粮油"
                },
                {
                    "id": "58ff0496936edf747a8b4612",
                    "name": "调味品"
                },
                {
                    "id": "5a27abc0936edf39418c236c",
                    "name": "方便速食"
                },
                {
                    "id": "5cff9d1c7cdbf00b4840f302",
                    "name": "冰淇淋"
                },
                {
                    "id": "58ff04d2936edf747a8b461b",
                    "name": "酒水饮料"
                },
                {
                    "id": "5a279d78916edf1544959b5a",
                    "name": "休闲零食"
                },
                {
                    "id": "5a69bc6a936edf9b3f8bf82a",
                    "name": "快手菜"
                },
                {
                    "id": "58ff0481936edfc57a8b463d",
                    "name": "南北干货"
                },
                {
                    "id": "59925f17936edf1d6f8c5a2a",
                    "name": "宝宝餐"
                },
                {
                    "id": "58ff043c916edf48288b45a3",
                    "name": "厨房用品"
                }
            ]
        },
        "server_time": 1565083674
    });

});
router.get('/web/xlmc/api/homeApi', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({
        "success": true,
        "code": 0,
        "msg": "ok",
        "data": {
            "notice": {},
            "list": [
                {
                    "type": 8,
                    "show_dark": false,
                    "icon_list": [
                        {
                            "cid": 1030,
                            "public_id": "5d417cc54df3e3c4738de681",
                            "public_name": "七夕美食告白190801",
                            "meteria_id": "5d417c774df3e37d378de40a",
                            "icon_url": "https://img.ddimg.mobi/94c44f8c4e9611564572820049.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/activity/special?page_id=5d4104274fb7977a528c57eb"
                                }
                            },
                            "is_pop_login": 0
                        },
                        {
                            "cid": 1031,
                            "public_id": "5d406f3c4ed5bdc23d8cf4ac",
                            "public_name": "嗨吃一夏鸡任选2件_轮播190803",
                            "meteria_id": "5d406eea4df3e3df3f8d0d93",
                            "icon_url": "https://img.ddimg.mobi/d2c94e1f7d5381564503773709.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/activity/special?page_id=5d406b034ed5bd78458cd3a3"
                                }
                            },
                            "is_pop_login": 0
                        },
                        {
                            "cid": 1032,
                            "public_id": "5d4426564fb797a17c8e3e06",
                            "public_name": "一口下去降5℃",
                            "meteria_id": "5d4425734df3e345028cc798",
                            "icon_url": "https://img.ddimg.mobi/0f7426803397d1564747121080.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/activity/special?page_id=5d4422604df3e3f3668b91e8"
                                }
                            },
                            "is_pop_login": 0
                        },
                        {
                            "cid": 1034,
                            "public_id": "5d3d4ccb4fb797997e8e73dd",
                            "public_name": "美食图鉴轮播7.28",
                            "meteria_id": "5d3d4c874df3e382488ef07c",
                            "icon_url": "https://img.ddimg.mobi/7c2df4a57cb251564298372619.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/activity/special?page_id=5d3d495c4df3e30c498efc2f"
                                }
                            },
                            "is_pop_login": 0
                        },
                        {
                            "cid": 1035,
                            "public_id": "5d43f6b34ed5bd39548edcc9",
                            "public_name": "早餐轮播8.3",
                            "meteria_id": "5d3e58614ed5bd181e8f5f51",
                            "icon_url": "https://img.ddimg.mobi/79d89da5e5a4b1564366938694.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/activity/special?page_id=5d3e57e24df3e3e2488fa16f"
                                }
                            },
                            "is_pop_login": 0
                        },
                        {
                            "cid": 1037,
                            "public_id": "5d444fd34df3e3d0578baf4f",
                            "public_name": "美心月饼预售8.02",
                            "meteria_id": "5d444f814fb797c0598e665c",
                            "icon_url": "https://img.ddimg.mobi/8edae202b398c1564758158788.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/activity/special?page_id=5d4449dd4df3e39d398bb41d"
                                }
                            },
                            "is_pop_login": 0
                        }
                    ]
                },
                {
                    "public_id": "5c74a36a01b311c47ca84f06",
                    "public_name": "首页广告条-绿色字2.26",
                    "type": 9,
                    "show_dark": false,
                    "image_url": "https://img.ddimg.mobi/2f15cd16130041551147841432.jpg",
                    "width": 1242,
                    "height": 120,
                    "link": "https://maicai.m.ddxq.mobi/cms/?v=1.0&id=59e01c30936edf353e8d98cf",
                    "is_pop_login": 0,
                    "cid": 1022
                },
                {
                    "type": 0,
                    "show_dark": true,
                    "background_image": "",
                    "icon_list": [
                        {
                            "icon_url": "https://img.ddimg.mobi/faed0c89b1ac61561979943620.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/category?category_id=58fd69dc936edf42508b48de"
                                }
                            },
                            "public_id": "5d19ec8c4ed5bd6e0c8b5939",
                            "public_name": "蔬菜豆制品icon1_7.1",
                            "cid": 1001,
                            "meteria_id": "5d19ec314ed5bdf20c8b5774",
                            "name": "蔬菜豆制品",
                            "is_pop_login": 0
                        },
                        {
                            "icon_url": "https://img.ddimg.mobi/57742da7f00ab1562725189267.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/category?category_id=58fefa38916edf9b128b45fc"
                                }
                            },
                            "public_id": "5d19ece84ed5bd7a0d8b5923",
                            "public_name": "肉禽蛋icon2_7.1",
                            "cid": 1002,
                            "meteria_id": "5d19ecb74ed5bdc2158b5a8f",
                            "name": "肉禽蛋",
                            "is_pop_login": 0
                        },
                        {
                            "icon_url": "https://img.ddimg.mobi/3f96191b097cd1562204510108.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/category?category_id=58fefb94936edf5f5d8b4767"
                                }
                            },
                            "public_id": "5d19ed5b4ed5bd4c0e8b5ac9",
                            "public_name": "水产海鲜icon3_7.1",
                            "cid": 1003,
                            "meteria_id": "5d19ed204ed5bd83168b5c0b",
                            "name": "水产海鲜",
                            "is_pop_login": 0
                        },
                        {
                            "icon_url": "https://img.ddimg.mobi/febc9219e5f061561980283162.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/category?category_id=595edd01916edf5011ca395d"
                                }
                            },
                            "public_id": "5d19edb24ed5bdba168b5cc7",
                            "public_name": "新鲜水果icon4_7.1",
                            "cid": 1004,
                            "meteria_id": "5d19ed7f4ed5bdfb0d8b5bc5",
                            "name": "水果",
                            "is_pop_login": 0
                        },
                        {
                            "icon_url": "https://img.ddimg.mobi/baf53e7d1e9ce1561980371874.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/category?category_id=58ff04e6936edfc57a8b464f"
                                }
                            },
                            "public_id": "5d19ee054ed5bd8f0a8b5b92",
                            "public_name": "乳品烘焙icon5_7.1",
                            "cid": 1005,
                            "meteria_id": "5d19edd74ed5bdf90c8b5b69",
                            "name": "乳品烘焙",
                            "is_pop_login": 0
                        },
                        {
                            "icon_url": "https://img.ddimg.mobi/67260446df1451561980456552.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/category?firstId=58ff04c5936edf777a8b46af"
                                }
                            },
                            "public_id": "5d19ee5c4ed5bd7e168b5e20",
                            "public_name": "米面粮油icon6_7.1",
                            "cid": 1006,
                            "meteria_id": "5d19ee2c4ed5bddb0d8b5adf",
                            "name": "米面粮油",
                            "is_pop_login": 0
                        },
                        {
                            "icon_url": "https://img.ddimg.mobi/a79822f496ec71561980537120.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/category?category_id=https://maicai.m.ddxq.mobi/?v=1.0#/category?category_id=5a27abc0936edf39418c236c"
                                }
                            },
                            "public_id": "5d19eeb04ed5bdc8158b5e74",
                            "public_name": "方便速食icon7_7.1",
                            "cid": 1007,
                            "meteria_id": "5d19ee804ed5bd370e8b5c9d",
                            "name": "方便速食",
                            "is_pop_login": 0
                        },
                        {
                            "icon_url": "https://img.ddimg.mobi/17964fae5012d1561980650167.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/category?firstId=58ff04d2936edf747a8b461b"
                                }
                            },
                            "public_id": "5d19ef254ed5bd26168b6202",
                            "public_name": "酒饮零食icon8_7.1",
                            "cid": 1008,
                            "meteria_id": "5d19eef14ed5bdff0c8b5df8",
                            "name": "酒饮零食",
                            "is_pop_login": 0
                        },
                        {
                            "icon_url": "https://img.ddimg.mobi/cc39ecee3cee51564386403745.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/category?category_id=59925f17936edf1d6f8c5a2a"
                                }
                            },
                            "public_id": "5d3ea30e4fb797ff7d8f46df",
                            "public_name": "宝宝餐 7.30",
                            "cid": 1071,
                            "meteria_id": "5d3ea4654df3e3c6298b9360",
                            "name": "宝宝餐",
                            "is_pop_login": 0
                        },
                        {
                            "icon_url": "https://img.ddimg.mobi/a19a8501bf4041561980956934.jpg",
                            "link": {
                                "type": 0,
                                "data": {
                                    "url": "https://maicai.m.ddxq.mobi/?v=1.0#/category?category_id=5cff9d1c7cdbf00b4840f302"
                                }
                            },
                            "public_id": "5d19f03c4ed5bdc9168b625f",
                            "public_name": "冰淇淋icon10_小程序",
                            "cid": 1072,
                            "meteria_id": "5d19f0204ed5bddd0d8b5f79",
                            "name": "冰淇淋",
                            "is_pop_login": 0
                        }
                    ]
                },
                {
                    "type": 3,
                    "show_dark": true,
                    "is_more": true,
                    "link": {
                        "type": 2,
                        "data": {
                            "id": "5d1d79c025e1f7624c8b4567",
                            "title": "限时抢购"
                        }
                    },
                    "status": 2,
                    "promotion_id": "5d1d79c025e1f7624c8b4567",
                    "sub_title": "07:00场",
                    "start_time": 1564786800,
                    "end_time": 1564804800,
                    "product_list": [
                        {
                            "id": "5b72911c01a6eaaf048b5d79",
                            "product_name": "爱森五花肉 500g",
                            "name": "爱森五花肉 500g",
                            "origin_price": "46.90",
                            "price": "41.80",
                            "vip_price": "",
                            "spec": "高端五花肉 吃出幸福的滋味",
                            "small_image": "https://img.ddimg.mobi/product/4513b9fc5935f1548406258985.jpg!deliver.product.list",
                            "category_id": "58fa1cc1936edfe6568b58c2",
                            "sizes": [],
                            "total_sales": 8790,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e514936edfe3568b572e,58fa1cc1936edfe6568b58c2",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 1,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b150c9bc0a1ea13728b4576",
                            "product_name": "粮全其美葱香味手抓饼 900g/袋",
                            "name": "粮全其美葱香味手抓饼 900g/袋",
                            "origin_price": "20.80",
                            "price": "18.80",
                            "vip_price": "",
                            "spec": "金黄酥脆 黄金扑鼻",
                            "small_image": "https://ddimg.ddxq.mobi/becc0e6b257781528108118451.jpg!maicai.product.list",
                            "category_id": "5b0ffb3845cd42cb548c913c",
                            "sizes": [],
                            "total_sales": 8458,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,5b0ffb3845cd42cb548c913c",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满35送粽子"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 11,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58f1b84d916edfb84ccb5f39",
                            "product_name": "松花菜半颗 约500g",
                            "name": "松花菜半颗 约500g",
                            "origin_price": "8.50",
                            "price": "7.59",
                            "vip_price": "",
                            "spec": "脆脆嫩嫩 花菜我一般选这种~",
                            "small_image": "https://ddimg.ddxq.mobi/47a79cef49d661492078512642.jpeg!maicai.product.list",
                            "category_id": "599fda09936edf10388f85fb",
                            "sizes": [],
                            "total_sales": 9027,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,599fda09936edf10388f85fb",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [
                                [
                                    "清甜爽脆",
                                    "质地细嫩"
                                ],
                                [
                                    "味甘鲜美",
                                    "粒细而均"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 56,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d15c51910abf114a940ca5d",
                            "product_name": "美国车厘子 250g",
                            "name": "美国车厘子 250g",
                            "origin_price": "32.90",
                            "price": "25.90",
                            "vip_price": "",
                            "spec": "果中钻石 甜蜜多汁~",
                            "small_image": "https://img.ddimg.mobi/product/b960de0ed28d11562551037392.jpg!deliver.product.list",
                            "category_id": "5953229c936edfd20c8b8bbe",
                            "sizes": [],
                            "total_sales": 8257,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6adf936edfe2568b5d95,5953229c936edfd20c8b8bbe",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59280487936edf5a7a8ebd0b",
                            "product_name": "芸豆 300g",
                            "name": "芸豆 300g",
                            "origin_price": "9.90",
                            "price": "5.99",
                            "vip_price": "",
                            "spec": "芸豆炒肉丝炖排骨 流口水ing",
                            "small_image": "https://img.ddimg.mobi/product/73c7833c39d6d1545274259948.jpg!maicai.product.list",
                            "category_id": "58fbf4d5936edfe4568b5986",
                            "sizes": [],
                            "total_sales": 8919,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4d5936edfe4568b5986",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 11,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5af3fd56c0a1ea5f248b458b",
                            "product_name": "四季宝柔滑花生酱 340g/瓶",
                            "name": "四季宝柔滑花生酱 340g/瓶",
                            "origin_price": "19.90",
                            "price": "16.90",
                            "vip_price": "",
                            "spec": "适合凉拌.涂抹、质地细腻味美，拌面也是超好吃~",
                            "small_image": "https://ddimg.ddxq.mobi/abf3023fb51611526109391551.jpg!maicai.product.list",
                            "category_id": "58fb3bb5936edfe5568b5909",
                            "sizes": [],
                            "total_sales": 7610,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3bb5936edfe5568b5909",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 8,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bf4dd1a716de100468c77c7",
                            "product_name": "艺杏小油豆腐 130g/袋",
                            "name": "艺杏小油豆腐 130g/袋",
                            "origin_price": "4.90",
                            "price": "4.29",
                            "vip_price": "",
                            "spec": "油豆腐烧肉 味道好极了~",
                            "small_image": "https://img.ddimg.mobi/product/e0f55322f48ae1543472645397.jpg!maicai.product.list",
                            "category_id": "58fbf508936edfe3568b599f",
                            "sizes": [],
                            "total_sales": 8758,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d233936edfe3568b5655,58fbf508936edfe3568b599f",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58e1c237916edfc84cc80688",
                            "product_name": "农夫山泉饮用天然水 550ml*28瓶",
                            "name": "农夫山泉饮用天然水 550ml*28瓶",
                            "origin_price": "35.80",
                            "price": "32.80",
                            "vip_price": "",
                            "spec": "天然弱碱性的健康水~",
                            "small_image": "https://img.ddimg.mobi/product/9f71a4750f1591554301429547.jpg!deliver.product.list",
                            "category_id": "58fb4109936edf88198b595b",
                            "sizes": [],
                            "total_sales": 8764,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5c4936edfe4568b5793,58fb4109936edf88198b595b",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 8,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bed12cd716de100468c4dd7",
                            "product_name": "伊赛澳洲原切冷冻牛腱 1kg",
                            "name": "伊赛澳洲原切冷冻牛腱 1kg",
                            "origin_price": "79.90",
                            "price": "69.90",
                            "vip_price": "",
                            "spec": "鲜切急冻 锁住美味",
                            "small_image": "https://img.ddimg.mobi/product/718558731a1eb1562568919636.jpg!deliver.product.list",
                            "category_id": "58fa206a936edfe4568b57e6",
                            "sizes": [],
                            "total_sales": 7225,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e51f936edf88198b5718,58fa206a936edfe4568b57e6",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b6a766ec0a1ea333a8b6f04",
                            "product_name": "妙可蓝多马苏里拉奶酪碎 125g/袋",
                            "name": "妙可蓝多马苏里拉奶酪碎 125g/袋",
                            "origin_price": "11.90",
                            "price": "8.90",
                            "vip_price": "",
                            "spec": "奶香浓郁 口感顺滑",
                            "small_image": "https://ddimg.ddxq.mobi/cedd7697d12571533723350035.jpg!maicai.product.list",
                            "category_id": "58fb3ac2936edfe5568b58e1",
                            "sizes": [],
                            "total_sales": 7303,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3ac2936edfe5568b58e1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5be2b145716de100468c1245",
                            "product_name": "加费尔德舟山冷冻去脏小黄鱼 300g",
                            "name": "加费尔德舟山冷冻去脏小黄鱼 300g",
                            "origin_price": "18.80",
                            "price": "15.80",
                            "vip_price": "",
                            "spec": "舟山海捕野生小黄鱼 去肠去腮更便捷",
                            "small_image": "https://img.ddimg.mobi/product/d9df7fe10be381548472525847.jpg!deliver.product.list",
                            "category_id": "58fa23d8916edf7e198b496a",
                            "sizes": [],
                            "total_sales": 8066,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa23d8916edf7e198b496a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        }
                    ]
                },
                {
                    "public_id": "5d40f7414fb79747778c4f20",
                    "public_name": "上海热销72小时8.2-8.4",
                    "cid": 1011,
                    "meteria_id": "5d40f70f4ed5bd73588cf814",
                    "type": 5,
                    "show_dark": true,
                    "image_url": "https://img.ddimg.mobi/f47511ffbfce91564538638180.jpg",
                    "title": "热销爆款",
                    "sub_title": "热销72小时",
                    "is_pop_login": 0,
                    "link": {
                        "type": 1,
                        "data": {
                            "id": "5d40f6904df3e344538d52f9",
                            "title": "热销爆款"
                        }
                    },
                    "is_more": true,
                    "product_list": [
                        {
                            "id": "5c9471687b37a12d3c79bf10",
                            "product_name": "云南文山黄牛鲜牛腩 260g",
                            "name": "云南文山黄牛鲜牛腩 260g",
                            "origin_price": "29.90",
                            "price": "27.80",
                            "vip_price": "",
                            "spec": "黄油是黄牛牛腩的精华~",
                            "small_image": "https://img.ddimg.mobi/product/e5b12559464b71553495475772.jpg!deliver.product.list",
                            "category_id": "58fa2059936edf89778b56e5",
                            "sizes": [],
                            "total_sales": 8440,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e51f936edf88198b5718,58fa2059936edf89778b56e5",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                },
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b10c21cc0a1eae5578b49df",
                            "product_name": "花糯玉米 约600g",
                            "name": "花糯玉米 约600g",
                            "origin_price": "5.90",
                            "price": "4.99",
                            "vip_price": "",
                            "spec": "软糯清甜 多彩多滋多味",
                            "small_image": "https://img.ddimg.mobi/product/71eadfc4e205a1544611911845.jpg!maicai.product.list",
                            "category_id": "58fbf4ab936edf42508b4646",
                            "sizes": [],
                            "total_sales": 8981,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4ab936edf42508b4646",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59ae1be16ec2c490338b45ac",
                            "product_name": "紫燕藤椒鸡 340g/盒",
                            "name": "紫燕藤椒鸡 340g/盒",
                            "origin_price": "29.90",
                            "price": "25.80",
                            "vip_price": "",
                            "spec": "新老包装交替 鸡肉嫩滑 入口清新爽口（新包装）",
                            "small_image": "https://ddimg.ddxq.mobi/ba26147de40261504694846264.jpg!maicai.product.list",
                            "category_id": "5b101134846c2e87048cba8e",
                            "sizes": [],
                            "total_sales": 8453,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,5b101134846c2e87048cba8e",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "人气排队熟食",
                                    "鸡肉嫩滑 清新爽口"
                                ],
                                [
                                    "一如既往的好味道",
                                    "大口吃肉嗨一夏~"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c7f2a382b12be5f0c4698d9",
                            "product_name": "有机鲜香菇 100g",
                            "name": "有机鲜香菇 100g",
                            "origin_price": "11.90",
                            "price": "8.99",
                            "vip_price": "",
                            "spec": "有机食品·新鲜香菇 带给你嫩滑与清香",
                            "small_image": "https://img.ddimg.mobi/product/ea806f95ab32a1551841098386.jpg!deliver.product.list",
                            "category_id": "58fbf4ed936edfe6568b5ace",
                            "sizes": [],
                            "total_sales": 8633,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4ed936edfe6568b5ace",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 13,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5cc53da97cdbf00b50691351",
                            "product_name": "苏食农场猪带皮五花肉 300g",
                            "name": "苏食农场猪带皮五花肉 300g",
                            "origin_price": "20.80",
                            "price": "18.80",
                            "vip_price": "",
                            "spec": "新老包装随机发货~肉质鲜嫩 自然生长 健康饲养",
                            "small_image": "https://img.ddimg.mobi/product/e4582d9980d2f1564294568927.jpg!deliver.product.list",
                            "category_id": "58fa1cc1936edfe6568b58c2",
                            "sizes": [],
                            "total_sales": 8561,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e514936edfe3568b572e,58fa1cc1936edfe6568b58c2",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 19,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5a168eb86ec2c4137f8b45cc",
                            "product_name": "蒙牛风味酸牛奶红枣味 100g*8杯",
                            "name": "蒙牛风味酸牛奶红枣味 100g*8杯",
                            "origin_price": "15.80",
                            "price": "12.90",
                            "vip_price": "",
                            "spec": "美丽从“枣”开始",
                            "small_image": "https://ddimg.ddxq.mobi/6cbb358a18af51511517529857.jpg!maicai.product.list",
                            "category_id": "58fb3a67936edf89778b57d1",
                            "sizes": [],
                            "total_sales": 8421,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a67936edf89778b57d1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 5,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5994168f916edf521126864f",
                            "product_name": "泰森冷鲜鸡大胸 500g",
                            "name": "泰森冷鲜鸡大胸 500g",
                            "origin_price": "20.80",
                            "price": "18.90",
                            "vip_price": "",
                            "spec": "我们都爱的大胸 比想象中还要嫩",
                            "small_image": "https://img.ddimg.mobi/product/46f51906085271548464946730.jpg!deliver.product.list",
                            "category_id": "58fa2201936edfe2568b589d",
                            "sizes": [],
                            "total_sales": 8515,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e531936edfe5568b5747,58fa2201936edfe2568b589d",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "泰森小鲜鸡肉",
                                    "自然生长无激素添加"
                                ],
                                [
                                    "肉嫩味鲜",
                                    "健身党补充蛋白质必备"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                },
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 18,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59367572936edf5a1aa07c1b",
                            "product_name": "鲜花生 400g",
                            "name": "鲜花生 400g",
                            "origin_price": "6.90",
                            "price": "5.49",
                            "vip_price": "",
                            "spec": "新鲜出土 我很脏可我好吃不上火~",
                            "small_image": "https://img.ddimg.mobi/product/2b59a7edc5d631556450305369.jpg!deliver.product.list",
                            "category_id": "58fbf4d5936edfe4568b5986",
                            "sizes": [],
                            "total_sales": 8863,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4d5936edfe4568b5986",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 11,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b73a68101a6eaaf048b6953",
                            "product_name": "统一冰红茶 250ml*24盒/箱",
                            "name": "统一冰红茶 250ml*24盒/箱",
                            "origin_price": "29.90",
                            "price": "27.80",
                            "vip_price": "",
                            "spec": "青春无极限， 统一冰红茶",
                            "small_image": "https://ddimg.ddxq.mobi/3596f9a9d4cf1534312624493.jpg!maicai.product.list",
                            "category_id": "58fb4119936edfe6568b5a53",
                            "sizes": [],
                            "total_sales": 7943,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5c4936edfe4568b5793,58fb4119936edfe6568b5a53",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 5,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5ba23d63d033a1de7d8b4b93",
                            "product_name": "加费尔德冷冻青虾仁 250g",
                            "name": "加费尔德冷冻青虾仁 250g",
                            "origin_price": "28.80",
                            "price": "25.80",
                            "vip_price": "",
                            "spec": "虾中臻品 Q弹紧致",
                            "small_image": "https://img.ddimg.mobi/product/6ffb854fc8fda1548472432748.jpg!deliver.product.list",
                            "category_id": "58fa23fe916edf9b278b495a",
                            "sizes": [],
                            "total_sales": 8733,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa23fe916edf9b278b495a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 23,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5cf0d1c3b0055a0b5d145b27",
                            "product_name": "光明鲜鸭蛋8枚 520g",
                            "name": "光明鲜鸭蛋8枚 520g",
                            "origin_price": "19.90",
                            "price": "17.80",
                            "vip_price": "",
                            "spec": "原生态鸭蛋 清洗后不易保存 有点脏脏的不要嫌弃哟~",
                            "small_image": "https://img.ddimg.mobi/product/33b73a7ddac3b1559286278251.jpg!deliver.product.list",
                            "category_id": "58fa2358916edf7d198b494a",
                            "sizes": [],
                            "total_sales": 7033,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e539936edf89778b567f,58fa2358916edf7d198b494a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bee9c4b716de100468c5e8f",
                            "product_name": "新西兰佳沛绿奇异果4个 400g",
                            "name": "新西兰佳沛绿奇异果4个 400g",
                            "origin_price": "19.80",
                            "price": "16.90",
                            "vip_price": "",
                            "spec": "维C满满",
                            "small_image": "https://img.ddimg.mobi/product/5b245d6d73cdb1547036675036.jpg!maicai.product.list",
                            "category_id": "593f5a99916edf4226a575b7",
                            "sizes": [],
                            "total_sales": 8364,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6a65936edfe6568b5dd6,593f5a99916edf4226a575b7",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 2,
                            "today_stockout": "可订明日",
                            "is_booking": 1
                        }
                    ]
                },
                {
                    "public_id": "5d39d2f84df3e3b0488c4abd",
                    "public_name": "周末吃好点",
                    "cid": 1012,
                    "meteria_id": "5d42e8024ed5bd41488e49d3",
                    "type": 5,
                    "show_dark": true,
                    "image_url": "https://img.ddimg.mobi/7473cbe5159281564665738139.jpg",
                    "title": "周末吃好点",
                    "sub_title": "周末吃好点",
                    "is_pop_login": 0,
                    "link": {
                        "type": 1,
                        "data": {
                            "id": "5d37f28e4ed5bdb00c8bc8e7",
                            "title": "周末吃好点"
                        }
                    },
                    "is_more": true,
                    "product_list": [
                        {
                            "id": "5d39436810abf132950d241f",
                            "product_name": "新疆吐鲁番马奶葡萄 500g",
                            "name": "新疆吐鲁番马奶葡萄 500g",
                            "origin_price": "13.90",
                            "price": "13.90",
                            "vip_price": "",
                            "spec": "吃葡萄不吐葡萄皮",
                            "small_image": "https://img.ddimg.mobi/product/ba886b657b71e1564157577189.jpg!deliver.product.list",
                            "category_id": "5957072a936edf19088c56f0",
                            "sizes": [],
                            "total_sales": 7367,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6d31916edf7a198b4b29,5957072a936edf19088c56f0",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 36,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5968b2ee936edf5b658d653d",
                            "product_name": "延世新鲜牧场牛奶 1L/瓶",
                            "name": "延世新鲜牧场牛奶 1L/瓶",
                            "origin_price": "34.90",
                            "price": "33.90",
                            "vip_price": "",
                            "spec": "韩国原装进口 来自延世牧场的新鲜问候",
                            "small_image": "https://ddimg.ddxq.mobi/ab052894ee1d881541952046214.jpg!maicai.product.list",
                            "category_id": "58fb3a24936edfe5568b58db",
                            "sizes": [],
                            "total_sales": 8756,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a24936edfe5568b58db",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "안녕하세요！",
                                    "来自延世的问候"
                                ],
                                [
                                    "1杯鲜奶营养一天",
                                    "喝过的人都说好~"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满35送粽子"
                                },
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "限时热卖"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bf94b7c716de100468c933a",
                            "product_name": "鲜活光明鳊鱼 550g以上",
                            "name": "鲜活光明鳊鱼 550g以上",
                            "origin_price": "21.90",
                            "price": "21.90",
                            "vip_price": "",
                            "spec": "一条带“身份证”的鳊鱼",
                            "small_image": "https://img.ddimg.mobi/product/a2c66dc45873f1556289631235.jpg!deliver.product.list",
                            "category_id": "58fa23d8916edf7e198b496a",
                            "sizes": [
                                {
                                    "title": "处理方式",
                                    "id": 1,
                                    "_id": "59104272936edfa4218e2c61",
                                    "values": [
                                        {
                                            "name": "杀好（要内脏）",
                                            "id": 32,
                                            "_id": "5c1daf0b6079d1f33993f49c",
                                            "price": "0.00"
                                        },
                                        {
                                            "name": "杀好（不要内脏）",
                                            "id": 1,
                                            "_id": "59104272936edfa4218e2c63",
                                            "price": "0.00"
                                        },
                                        {
                                            "name": "不杀",
                                            "id": 25,
                                            "_id": "5a44e384916edfbd378f33fb",
                                            "price": "0.00"
                                        }
                                    ]
                                }
                            ],
                            "total_sales": 8500,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa23d8916edf7e198b496a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5cc2d9b5b0055a4fab174948",
                            "product_name": "凡谷1号番茄 500g",
                            "name": "凡谷1号番茄 500g",
                            "origin_price": "9.90",
                            "price": "7.70",
                            "vip_price": "",
                            "spec": "果肉沙软 甜而不腻 儿时番茄味",
                            "small_image": "https://img.ddimg.mobi/product/bb9efb235bdce1561547705384.jpg!deliver.product.list",
                            "category_id": "58fbf4bf936edfe3568b5990",
                            "sizes": [],
                            "total_sales": 8846,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4bf936edfe3568b5990",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "一件钟情价"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 12,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5953744c936edfc30d8cae82",
                            "product_name": "兰皇鸡蛋10枚 600g",
                            "name": "兰皇鸡蛋10枚 600g",
                            "origin_price": "30.80",
                            "price": "30.80",
                            "vip_price": "",
                            "spec": "杜绝沙门氏菌 15天内可生吃的高营养鸡蛋",
                            "small_image": "https://ddimg.ddxq.mobi/1b26ffc7d8dba1498640962443.jpg!maicai.product.list",
                            "category_id": "58fa233c916edf7c198b4972",
                            "sizes": [],
                            "total_sales": 8706,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e539936edf89778b567f,58fa233c916edf7c198b4972",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "杜绝沙门氏菌",
                                    "传承日本科学饲料配方"
                                ],
                                [
                                    "可生吃！可生吃！",
                                    "色泽光亮 腥味很少~"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 8,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d159d3fb0055a0b4d3566b4",
                            "product_name": "六鳌红蜜薯 750g/袋",
                            "name": "六鳌红蜜薯 750g/袋",
                            "origin_price": "9.90",
                            "price": "9.90",
                            "vip_price": "",
                            "spec": "网红红薯 细腻无丝 非你莫“薯”~",
                            "small_image": "https://img.ddimg.mobi/product/8ac9b25dd6cdd1562234382792.jpg!deliver.product.list",
                            "category_id": "58fbf4ab936edf42508b4646",
                            "sizes": [],
                            "total_sales": 8859,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4ab936edf42508b4646",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 65,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c94670c2b12be5f0f41d1ad",
                            "product_name": "云南文山黄牛鲜牛里脊 260g",
                            "name": "云南文山黄牛鲜牛里脊 260g",
                            "origin_price": "39.90",
                            "price": "39.90",
                            "vip_price": "",
                            "spec": "牛的小嫩肉 轻松炒制就很香嫩",
                            "small_image": "https://img.ddimg.mobi/product/c8059ddba188a1553495487913.jpg!deliver.product.list",
                            "category_id": "5afbf114846c2e9b6e8d7cb6",
                            "sizes": [],
                            "total_sales": 8205,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e51f936edf88198b5718,5afbf114846c2e9b6e8d7cb6",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d36624d10abf132a20f2500",
                            "product_name": "宁夏硒砂瓜1个 约10斤",
                            "name": "宁夏硒砂瓜1个 约10斤",
                            "origin_price": "27.90",
                            "price": "23.90",
                            "vip_price": "",
                            "spec": "石缝里长出的西瓜",
                            "small_image": "https://img.ddimg.mobi/product/18d8e32e2bdcf1563854687189.jpg!deliver.product.list",
                            "category_id": "59801a60936edf352d98dd31",
                            "sizes": [],
                            "total_sales": 8487,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6a3b936edfe3568b5c5c,59801a60936edf352d98dd31",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": ""
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 76,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d10493a7cdbf00b4b622ccb",
                            "product_name": "奇隽冷鲜散养草鸡（半只） 500g",
                            "name": "奇隽冷鲜散养草鸡（半只） 500g",
                            "origin_price": "39.80",
                            "price": "39.80",
                            "vip_price": "",
                            "spec": "（半只）清蒸草鸡 肉质鲜嫩 煲汤小炒皆可",
                            "small_image": "https://img.ddimg.mobi/product/3cfdc659427651562293567884.jpg!deliver.product.list",
                            "category_id": "590ad5b1936edf747a8d5b03",
                            "sizes": [],
                            "total_sales": 6966,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e531936edfe5568b5747,590ad5b1936edf747a8d5b03",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 0,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d3fdce7b0055a0b52777ea8",
                            "product_name": "瑶池蟠桃4个 约780g",
                            "name": "瑶池蟠桃4个 约780g",
                            "origin_price": "15.90",
                            "price": "15.90",
                            "vip_price": "",
                            "spec": "神话中的仙果寿桃",
                            "small_image": "https://img.ddimg.mobi/product/3528b856cb7311564043107535.jpg!deliver.product.list",
                            "category_id": "59715d1c936edfde278d49f8",
                            "sizes": [],
                            "total_sales": 5047,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 1,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6cf9916edf7c198b4afa,59715d1c936edfde278d49f8",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 0,
                            "today_stockout": "",
                            "is_booking": 0
                        }
                    ]
                },
                {
                    "public_id": "5d3e5a594fb797877e8f0caa",
                    "public_name": "崇明生态时蔬",
                    "cid": 1013,
                    "meteria_id": "5d3e5a264df3e322418b45e1",
                    "type": 5,
                    "show_dark": true,
                    "image_url": "https://img.ddimg.mobi/24d9d0e215b861564367395745.jpg",
                    "title": "崇明生态时蔬",
                    "sub_title": "从产地到餐桌 新鲜直达",
                    "is_pop_login": 0,
                    "link": {
                        "type": 1,
                        "data": {
                            "id": "5d3e542b4fb797f17d8f102c",
                            "title": "崇明生态时蔬"
                        }
                    },
                    "is_more": true,
                    "product_list": [
                        {
                            "id": "5d26f1897cdbf031026a7ba6",
                            "product_name": "崇明水果玉米 350g/份",
                            "name": "崇明水果玉米 350g/份",
                            "origin_price": "12.80",
                            "price": "12.80",
                            "vip_price": "",
                            "spec": "源自生态岛 可以生吃的玉米",
                            "small_image": "https://img.ddimg.mobi/product/bf26c9069b7b91562915404678.jpg!deliver.product.list",
                            "category_id": "58fbf4ab936edf42508b4646",
                            "sizes": [],
                            "total_sales": 6034,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4ab936edf42508b4646",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 1,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d36bc997cdbf0311a28d94e",
                            "product_name": "崇明苦瓜 500g/份",
                            "name": "崇明苦瓜 500g/份",
                            "origin_price": "9.50",
                            "price": "9.50",
                            "vip_price": "",
                            "spec": "源自生态岛 小仙女夏日必吃 高颜值的秘密",
                            "small_image": "https://img.ddimg.mobi/product/78064946d46121563937943325.jpg!deliver.product.list",
                            "category_id": "58fbf4bf936edfe3568b5990",
                            "sizes": [],
                            "total_sales": 6064,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4bf936edfe3568b5990",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 13,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d36b90010abf132987a16d9",
                            "product_name": "崇明番茄 450g/份",
                            "name": "崇明番茄 450g/份",
                            "origin_price": "7.80",
                            "price": "7.80",
                            "vip_price": "",
                            "spec": "炒一盘来自生态岛的番茄炒蛋~",
                            "small_image": "https://img.ddimg.mobi/product/e9ee8a87d51981563939106167.jpg!deliver.product.list",
                            "category_id": "58fbf4bf936edfe3568b5990",
                            "sizes": [],
                            "total_sales": 6775,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4bf936edfe3568b5990",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 5,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d40219710abf1329643a268",
                            "product_name": "崇明芦笋 350g/份",
                            "name": "崇明芦笋 350g/份",
                            "origin_price": "11.90",
                            "price": "11.90",
                            "vip_price": "",
                            "spec": "安心菜 源自生态岛 嫩到没朋友",
                            "small_image": "https://img.ddimg.mobi/product/5bb139a649c6b1547802974306.jpg!deliver.product.list",
                            "category_id": "58fbf4ab936edf42508b4646",
                            "sizes": [],
                            "total_sales": 4432,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4ab936edf42508b4646",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d40117810abf1329457b16c",
                            "product_name": "崇明青甘蓝 1.5kg/份",
                            "name": "崇明青甘蓝 1.5kg/份",
                            "origin_price": "8.90",
                            "price": "8.90",
                            "vip_price": "",
                            "spec": "安心菜 源自生态岛 脆嫩汁多",
                            "small_image": "https://img.ddimg.mobi/product/593c46e3f893e1548076285428.jpg!deliver.product.list",
                            "category_id": "599fda09936edf10388f85fb",
                            "sizes": [],
                            "total_sales": 4244,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,599fda09936edf10388f85fb",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d26f01eb0055a0b565fbba0",
                            "product_name": "崇明甜芦粟 500g/份",
                            "name": "崇明甜芦粟 500g/份",
                            "origin_price": "15.90",
                            "price": "15.90",
                            "vip_price": "",
                            "spec": "红心为糖心芦粟 会使甜芦粟更甜更好吃~",
                            "small_image": "https://img.ddimg.mobi/product/353e2e78240db1562842115460.jpg!deliver.product.list",
                            "category_id": "58fbf4ab936edf42508b4646",
                            "sizes": [],
                            "total_sales": 6456,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4ab936edf42508b4646",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 1,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d26f3277cdbf030fd52f443",
                            "product_name": "崇明小冬瓜1个 750g以上",
                            "name": "崇明小冬瓜1个 750g以上",
                            "origin_price": "9.80",
                            "price": "9.80",
                            "vip_price": "",
                            "spec": "源自崇明岛 口味纯正 每一个冬瓜都是精选",
                            "small_image": "https://img.ddimg.mobi/product/af477d4097f591562924713299.jpg!deliver.product.list",
                            "category_id": "58fbf4bf936edfe3568b5990",
                            "sizes": [],
                            "total_sales": 6720,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4bf936edfe3568b5990",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d11df5f10abf114b572f31b",
                            "product_name": "崇明金瓜(半个) 850g",
                            "name": "崇明金瓜(半个) 850g",
                            "origin_price": "9.90",
                            "price": "9.90",
                            "vip_price": "",
                            "spec": "煮熟以后秒变丝 夏日开胃凉菜~ ",
                            "small_image": "https://img.ddimg.mobi/product/8531011591ba61561450899562.gif!deliver.product.list",
                            "category_id": "58fbf4bf936edfe3568b5990",
                            "sizes": [],
                            "total_sales": 6673,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4bf936edfe3568b5990",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": true,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d36ae487cdbf0310c75bda2",
                            "product_name": "崇明秋葵 350g/份",
                            "name": "崇明秋葵 350g/份",
                            "origin_price": "12.50",
                            "price": "12.50",
                            "vip_price": "",
                            "spec": "源自生态岛 能拉丝的胶原蛋白 美容又养胃",
                            "small_image": "https://img.ddimg.mobi/product/4eeb8d08dc53a1563938147138.jpg!deliver.product.list",
                            "category_id": "58fbf4bf936edfe3568b5990",
                            "sizes": [],
                            "total_sales": 6080,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4bf936edfe3568b5990",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d401e9fb0055a0b4c7907ac",
                            "product_name": "崇明胡萝卜 450g/份",
                            "name": "崇明胡萝卜 450g/份",
                            "origin_price": "5.90",
                            "price": "5.90",
                            "vip_price": "",
                            "spec": "安心菜 源自生态岛",
                            "small_image": "https://img.ddimg.mobi/product/07c80e9d824931564456134148.jpg!deliver.product.list",
                            "category_id": "58fbf4ab936edf42508b4646",
                            "sizes": [],
                            "total_sales": 5132,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4ab936edf42508b4646",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 9,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d36b9feb0055a0b5d145b3a",
                            "product_name": "崇明毛豆 500g/份",
                            "name": "崇明毛豆 500g/份",
                            "origin_price": "6.90",
                            "price": "6.90",
                            "vip_price": "",
                            "spec": "源自生态岛 每粒都是满满的豆儿香~",
                            "small_image": "https://img.ddimg.mobi/product/41ef001243ecf1563937983244.jpg!deliver.product.list",
                            "category_id": "58fbf4d5936edfe4568b5986",
                            "sizes": [],
                            "total_sales": 6879,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4d5936edfe4568b5986",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 0,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d36b45110abf132912eb2bc",
                            "product_name": "崇明杭茄 500g/份",
                            "name": "崇明杭茄 500g/份",
                            "origin_price": "9.90",
                            "price": "9.90",
                            "vip_price": "",
                            "spec": "源自生态岛 肉末茄子 很下饭哦~",
                            "small_image": "https://img.ddimg.mobi/product/568f32835d8511563873380000.jpg!deliver.product.list",
                            "category_id": "58fbf4ab936edf42508b4646",
                            "sizes": [],
                            "total_sales": 6287,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4ab936edf42508b4646",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 0,
                            "today_stockout": "",
                            "is_booking": 0
                        }
                    ]
                },
                {
                    "public_id": "5d2e98254fb797cc568c832c",
                    "public_name": "肉禽蛋专题7.17-7.24",
                    "cid": 1014,
                    "meteria_id": "5d2e7e3f4fb7979a798c56ec",
                    "type": 5,
                    "show_dark": true,
                    "image_url": "https://img.ddimg.mobi/44ef4c6de93f21563328061721.jpg",
                    "title": "鲜肉铺子",
                    "sub_title": "鲜肉铺子",
                    "is_pop_login": 0,
                    "link": {
                        "type": 1,
                        "data": {
                            "id": "5d2e7cc24df3e3b41c8d18c9",
                            "title": "鲜肉铺子"
                        }
                    },
                    "is_more": true,
                    "product_list": [
                        {
                            "id": "5d1f088810abf1329a311096",
                            "product_name": "苏食农场猪冷鲜排骨粒 400g",
                            "name": "苏食农场猪冷鲜排骨粒 400g",
                            "origin_price": "38.80",
                            "price": "38.80",
                            "vip_price": "",
                            "spec": "新老包装随机发货~肉质鲜嫩 自然生长 健康饲养",
                            "small_image": "https://img.ddimg.mobi/product/97f9f599ae7fb1564292095206.jpg!deliver.product.list",
                            "category_id": "5b0ff44306752ec0298bcd85",
                            "sizes": [],
                            "total_sales": 7379,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e514936edfe3568b572e,5b0ff44306752ec0298bcd85",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b72911c01a6eaaf048b5d79",
                            "product_name": "爱森五花肉 500g",
                            "name": "爱森五花肉 500g",
                            "origin_price": "46.90",
                            "price": "41.80",
                            "vip_price": "",
                            "spec": "高端五花肉 吃出幸福的滋味",
                            "small_image": "https://img.ddimg.mobi/product/4513b9fc5935f1548406258985.jpg!deliver.product.list",
                            "category_id": "58fa1cc1936edfe6568b58c2",
                            "sizes": [],
                            "total_sales": 8790,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 1,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e514936edfe3568b572e,58fa1cc1936edfe6568b58c2",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 1,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 1,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c94670c2b12be5f0f41d1ad",
                            "product_name": "云南文山黄牛鲜牛里脊 260g",
                            "name": "云南文山黄牛鲜牛里脊 260g",
                            "origin_price": "39.90",
                            "price": "39.90",
                            "vip_price": "",
                            "spec": "牛的小嫩肉 轻松炒制就很香嫩",
                            "small_image": "https://img.ddimg.mobi/product/c8059ddba188a1553495487913.jpg!deliver.product.list",
                            "category_id": "5afbf114846c2e9b6e8d7cb6",
                            "sizes": [],
                            "total_sales": 8205,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e51f936edf88198b5718,5afbf114846c2e9b6e8d7cb6",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c9471687b37a12d3c79bf10",
                            "product_name": "云南文山黄牛鲜牛腩 260g",
                            "name": "云南文山黄牛鲜牛腩 260g",
                            "origin_price": "29.90",
                            "price": "27.80",
                            "vip_price": "",
                            "spec": "黄油是黄牛牛腩的精华~",
                            "small_image": "https://img.ddimg.mobi/product/e5b12559464b71553495475772.jpg!deliver.product.list",
                            "category_id": "58fa2059936edf89778b56e5",
                            "sizes": [],
                            "total_sales": 8440,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e51f936edf88198b5718,58fa2059936edf89778b56e5",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                },
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5a50892b6ec2c4ae648b459a",
                            "product_name": "膳博士黑猪小排 350g",
                            "name": "膳博士黑猪小排 350g",
                            "origin_price": "35.90",
                            "price": "35.90",
                            "vip_price": "",
                            "spec": "猪肉清香不腥膻~",
                            "small_image": "https://img.ddimg.mobi/product/3177b52e525c31562325865612.jpg!deliver.product.list",
                            "category_id": "5b0ff46006752e482c8bc469",
                            "sizes": [],
                            "total_sales": 8557,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e514936edfe3568b572e,5b0ff46006752e482c8bc469",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "深山慢养谷饲",
                                    "生长周期可追溯"
                                ],
                                [
                                    "品牌肉膳博士",
                                    "吃出猪肉原有的味道"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 1,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c947c40ca203475646ed932",
                            "product_name": "云南文山黄牛鲜牛肉丝 260g",
                            "name": "云南文山黄牛鲜牛肉丝 260g",
                            "origin_price": "32.90",
                            "price": "32.90",
                            "vip_price": "",
                            "spec": "轻松一炒就是大神级的牛肉盛宴",
                            "small_image": "https://img.ddimg.mobi/product/c2ce941b613af1553495401430.jpg!deliver.product.list",
                            "category_id": "5b0fff48c5702e357f8bae78",
                            "sizes": [],
                            "total_sales": 8568,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e51f936edf88198b5718,5b0fff48c5702e357f8bae78",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 9,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5cc5614310abf114ba7ca783",
                            "product_name": "苏食农场猪后腿筒骨 400g",
                            "name": "苏食农场猪后腿筒骨 400g",
                            "origin_price": "18.90",
                            "price": "18.90",
                            "vip_price": "",
                            "spec": "肉质鲜嫩 自然生长 健康饲养",
                            "small_image": "https://img.ddimg.mobi/product/bffff0df942b31564377417478.jpg!deliver.product.list",
                            "category_id": "58fa1f3c936edfe2568b584b",
                            "sizes": [],
                            "total_sales": 7950,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e514936edfe3568b572e,58fa1f3c936edfe2568b584b",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 10,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5cd935cfb0055a0b62385828",
                            "product_name": "膳博士黑猪冷鲜猪汤骨块 500g",
                            "name": "膳博士黑猪冷鲜猪汤骨块 500g",
                            "origin_price": "28.90",
                            "price": "28.90",
                            "vip_price": "",
                            "spec": "美丽牧场 科技养殖 猪肉清香不腥膻",
                            "small_image": "https://img.ddimg.mobi/product/a049ef338019b1562325637501.jpg!deliver.product.list",
                            "category_id": "58fa1f3c936edfe2568b584b",
                            "sizes": [],
                            "total_sales": 8025,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e514936edfe3568b572e,58fa1f3c936edfe2568b584b",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5953744c936edfc30d8cae82",
                            "product_name": "兰皇鸡蛋10枚 600g",
                            "name": "兰皇鸡蛋10枚 600g",
                            "origin_price": "30.80",
                            "price": "30.80",
                            "vip_price": "",
                            "spec": "杜绝沙门氏菌 15天内可生吃的高营养鸡蛋",
                            "small_image": "https://ddimg.ddxq.mobi/1b26ffc7d8dba1498640962443.jpg!maicai.product.list",
                            "category_id": "58fa233c916edf7c198b4972",
                            "sizes": [],
                            "total_sales": 8706,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e539936edf89778b567f,58fa233c916edf7c198b4972",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "杜绝沙门氏菌",
                                    "传承日本科学饲料配方"
                                ],
                                [
                                    "可生吃！可生吃！",
                                    "色泽光亮 腥味很少~"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 8,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bab79c0d033a1de7d8b849d",
                            "product_name": "泰森冷鲜鸡腿肉丁 500g",
                            "name": "泰森冷鲜鸡腿肉丁 500g",
                            "origin_price": "25.80",
                            "price": "25.80",
                            "vip_price": "",
                            "spec": "鸡腿上的肉我都帮你处理好啦",
                            "small_image": "https://img.ddimg.mobi/product/c9d398517ce4f1548408929390.jpg!deliver.product.list",
                            "category_id": "58fa2219936edf89778b571f",
                            "sizes": [],
                            "total_sales": 8632,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e531936edfe5568b5747,58fa2219936edf89778b571f",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 17,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5a2137016ec2c434708b4593",
                            "product_name": "泰森冷冻鸡爪 500g",
                            "name": "泰森冷冻鸡爪 500g",
                            "origin_price": "22.90",
                            "price": "22.90",
                            "vip_price": "",
                            "spec": "糟卤凤爪值得一试",
                            "small_image": "https://img.ddimg.mobi/product/2c76e1ebf65021548464603088.jpg!deliver.product.list",
                            "category_id": "58fa222f936edfe5568b5842",
                            "sizes": [],
                            "total_sales": 8861,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e531936edfe5568b5747,58fa222f936edfe5568b5842",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "超爱嘬的糟卤味~",
                                    "糟卤鸡爪，流口水啦~"
                                ],
                                [
                                    "喜欢吃辣的试试看",
                                    "糟卤料就在你旁边~"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 14,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c3ef1cc2b12be5f13049847",
                            "product_name": "鸿轩农业土鸡蛋15枚",
                            "name": "鸿轩农业土鸡蛋15枚",
                            "origin_price": "21.90",
                            "price": "21.90",
                            "vip_price": "",
                            "spec": "每天补充蛋白质 收获自己健康身体",
                            "small_image": "https://img.ddimg.mobi/product/1a9459600ba7f1547629528079.jpg!deliver.product.list",
                            "category_id": "58fa233c916edf7c198b4972",
                            "sizes": [],
                            "total_sales": 8035,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e539936edf89778b567f,58fa233c916edf7c198b4972",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 9,
                                    "type_name": "29.9元2件",
                                    "tag": "29.9元任选2件"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 7,
                            "today_stockout": "",
                            "is_booking": 0
                        }
                    ]
                },
                {
                    "public_id": "5d43c98c4ed5bdba538ee803",
                    "public_name": "水产海鲜 光明活鱼_专题 08.03",
                    "cid": 1015,
                    "meteria_id": "5d43c9084fb797a94c8ddeb1",
                    "type": 5,
                    "show_dark": true,
                    "image_url": "https://img.ddimg.mobi/5fac3f4aeb3a71564723401703.jpg",
                    "title": "光明鲜活鱼",
                    "sub_title": "光明鲜活鱼",
                    "is_pop_login": 0,
                    "link": {
                        "type": 1,
                        "data": {
                            "id": "5d11f6464fb7974f058c90be",
                            "title": "光明鲜活鱼"
                        }
                    },
                    "is_more": true,
                    "product_list": [
                        {
                            "id": "5bf94b7c716de100468c933a",
                            "product_name": "鲜活光明鳊鱼 550g以上",
                            "name": "鲜活光明鳊鱼 550g以上",
                            "origin_price": "21.90",
                            "price": "21.90",
                            "vip_price": "",
                            "spec": "一条带“身份证”的鳊鱼",
                            "small_image": "https://img.ddimg.mobi/product/a2c66dc45873f1556289631235.jpg!deliver.product.list",
                            "category_id": "58fa23d8916edf7e198b496a",
                            "sizes": [
                                {
                                    "title": "处理方式",
                                    "id": 1,
                                    "_id": "59104272936edfa4218e2c61",
                                    "values": [
                                        {
                                            "name": "杀好（要内脏）",
                                            "id": 32,
                                            "_id": "5c1daf0b6079d1f33993f49c",
                                            "price": "0.00"
                                        },
                                        {
                                            "name": "杀好（不要内脏）",
                                            "id": 1,
                                            "_id": "59104272936edfa4218e2c63",
                                            "price": "0.00"
                                        },
                                        {
                                            "name": "不杀",
                                            "id": 25,
                                            "_id": "5a44e384916edfbd378f33fb",
                                            "price": "0.00"
                                        }
                                    ]
                                }
                            ],
                            "total_sales": 8500,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa23d8916edf7e198b496a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bf0a1a8716de100468c67ea",
                            "product_name": "鲜活光明鲫鱼 450g以上",
                            "name": "鲜活光明鲫鱼 450g以上",
                            "origin_price": "19.90",
                            "price": "19.90",
                            "vip_price": "",
                            "spec": "一条有身份证的品牌鲫鱼哦~(重量为宰杀前重量)",
                            "small_image": "https://img.ddimg.mobi/product/0e6ebfa196be71545278158297.png!maicai.product.list",
                            "category_id": "58fa23d8916edf7e198b496a",
                            "sizes": [
                                {
                                    "title": "处理方式",
                                    "id": 1,
                                    "_id": "59104272936edfa4218e2c61",
                                    "values": [
                                        {
                                            "name": "杀好（要内脏）",
                                            "id": 32,
                                            "_id": "5c1daf0b6079d1f33993f49c",
                                            "price": "0.00"
                                        },
                                        {
                                            "name": "不杀",
                                            "id": 25,
                                            "_id": "5a44e384916edfbd378f33fb",
                                            "price": "0.00"
                                        },
                                        {
                                            "name": "杀好（不要内脏）",
                                            "id": 1,
                                            "_id": "59104272936edfa4218e2c63",
                                            "price": "0.00"
                                        }
                                    ]
                                }
                            ],
                            "total_sales": 8712,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa23d8916edf7e198b496a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d25bc8410abf132a65d3612",
                            "product_name": "冰鲜海蛎肉 200g/罐",
                            "name": "冰鲜海蛎肉 200g/罐",
                            "origin_price": "15.80",
                            "price": "15.80",
                            "vip_price": "",
                            "spec": "肉肥爽滑 海中牛奶~ 小心有碎壳",
                            "small_image": "https://img.ddimg.mobi/product/b0bbe98c851111564125935652.jpg!deliver.product.list",
                            "category_id": "58fa2412916edfd62d8b495b",
                            "sizes": [],
                            "total_sales": 6215,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 1,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa2412916edfd62d8b495b",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 9,
                                    "type_name": "29.9元2件",
                                    "tag": "29.9元任选2件"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5a0283226ec2c4bd4c8b4691",
                            "product_name": "鲜活基围虾 350g",
                            "name": "鲜活基围虾 350g",
                            "origin_price": "33.90",
                            "price": "33.90",
                            "vip_price": "",
                            "spec": "精挑细选大个头 到家活蹦乱跳哒~",
                            "small_image": "https://img.ddimg.mobi/product/aba793c26fe751544415551443.jpg!maicai.product.list",
                            "category_id": "58fa23fe916edf9b278b495a",
                            "sizes": [],
                            "total_sales": 9036,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa23fe916edf9b278b495a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "叮咚家的虾，顶呱呱",
                                    "个大鲜活，棒棒哒"
                                ],
                                [
                                    "椒盐味，嘎嘣脆",
                                    "白灼蘸酱香甜嫩"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 17,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5a0283026ec2c4bd4c8b4685",
                            "product_name": "鲜活大头虾 350g",
                            "name": "鲜活大头虾 350g",
                            "origin_price": "39.90",
                            "price": "27.90",
                            "vip_price": "",
                            "spec": "活蹦乱跳个头大 每一只精挑细选！",
                            "small_image": "https://img.ddimg.mobi/product/613d3a1bf57b61559014527815.jpg!deliver.product.list",
                            "category_id": "58fa23fe916edf9b278b495a",
                            "sizes": [],
                            "total_sales": 8906,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa23fe916edf9b278b495a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "鲜活有氧配送",
                                    "到家活蹦乱跳哦~"
                                ],
                                [
                                    "个个人工精心挑选",
                                    "鲜嫩肉厚 吃着爽！"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "民生好货"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 14,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5cdd605c10abf114b708b207",
                            "product_name": "鲜活清水小龙虾（4-6钱） 500g",
                            "name": "鲜活清水小龙虾（4-6钱） 500g",
                            "origin_price": "31.90",
                            "price": "31.90",
                            "vip_price": "",
                            "spec": "1斤不够吃 3斤组合装更实惠哟~",
                            "small_image": "https://img.ddimg.mobi/product/af0e2ff80fe161558012011093.jpg!deliver.product.list",
                            "category_id": "58fa23fe916edf9b278b495a",
                            "sizes": [],
                            "total_sales": 8899,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa23fe916edf9b278b495a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 22,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58eec4d7916edf244dc9db88",
                            "product_name": "鲜活肥美大蛏子 500g",
                            "name": "鲜活肥美大蛏子 500g",
                            "origin_price": "25.90",
                            "price": "25.90",
                            "vip_price": "",
                            "spec": "蒜蓉剁椒炒蛏子 味道超级好",
                            "small_image": "https://img.ddimg.mobi/product/07715540dfe631557119190862.jpg!deliver.product.list",
                            "category_id": "58fa2412916edfd62d8b495b",
                            "sizes": [],
                            "total_sales": 8822,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa2412916edfd62d8b495b",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 5,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5938bcd9916edf9a79944d09",
                            "product_name": "鲜活蛤蜊 500g",
                            "name": "鲜活蛤蜊 500g",
                            "origin_price": "19.90",
                            "price": "19.90",
                            "vip_price": "",
                            "spec": "吃了蛤蜊肉  百味都失灵",
                            "small_image": "https://img.ddimg.mobi/product/f6cb5f9f803081557119075931.jpg!deliver.product.list",
                            "category_id": "58fa2412916edfd62d8b495b",
                            "sizes": [],
                            "total_sales": 8770,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa2412916edfd62d8b495b",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 9,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b1f882bc0a1ea2c4a8b55eb",
                            "product_name": "鲜活六月黄螃蟹2只 130g以上",
                            "name": "鲜活六月黄螃蟹2只 130g以上",
                            "origin_price": "29.90",
                            "price": "29.90",
                            "vip_price": "",
                            "spec": "单只65g以上 以公蟹为主 ",
                            "small_image": "https://img.ddimg.mobi/product/e21bba96b52ad1559802816039.jpg!deliver.product.list",
                            "category_id": "58fa242b916edf7a198b49ac",
                            "sizes": [],
                            "total_sales": 8505,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa242b916edf7a198b49ac",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "壳薄 肉嫩 黄多",
                                    "蟹黄味浓 唇齿留香~"
                                ],
                                [
                                    "大闸蟹里的小鲜肉",
                                    "专治夏日里的食欲不振"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 8,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5cb06990ca2034756041c6f3",
                            "product_name": "鲜活光明河鳗1条 500g以上",
                            "name": "鲜活光明河鳗1条 500g以上",
                            "origin_price": "79.90",
                            "price": "79.90",
                            "vip_price": "",
                            "spec": "肉肥味美 营养价值高",
                            "small_image": "https://img.ddimg.mobi/product/44928ae69ce1e1557473766947.jpg!deliver.product.list",
                            "category_id": "58fa23d8916edf7e198b496a",
                            "sizes": [
                                {
                                    "title": "处理方式",
                                    "id": 9,
                                    "_id": "5a1cf2e3916edf0c6e90053e",
                                    "values": [
                                        {
                                            "name": "杀好，不剪段",
                                            "id": 19,
                                            "_id": "5a1cf2e3916edf0c6e900540",
                                            "price": "0.00"
                                        },
                                        {
                                            "name": "不杀",
                                            "id": 18,
                                            "_id": "5a1cf2e3916edf0c6e90053f",
                                            "price": "0.00"
                                        },
                                        {
                                            "name": "杀好，剪段",
                                            "id": 20,
                                            "_id": "5a1cf2e3916edf0c6e900541",
                                            "price": "0.00"
                                        }
                                    ]
                                }
                            ],
                            "total_sales": 6267,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa23d8916edf7e198b496a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 0,
                            "today_stockout": "",
                            "is_booking": 0
                        }
                    ]
                },
                {
                    "public_id": "5d3825344ed5bda90c8c0163",
                    "public_name": "应季鲜果_翠冠梨_7.24",
                    "cid": 1016,
                    "meteria_id": "5d38250d4fb797e06d8be137",
                    "type": 5,
                    "show_dark": true,
                    "image_url": "https://img.ddimg.mobi/7d5fa7f70ad941563960549968.jpg",
                    "title": "应季鲜果",
                    "sub_title": "应季鲜果",
                    "is_pop_login": 0,
                    "link": {
                        "type": 1,
                        "data": {
                            "id": "5d381ed84fb797a86e8be06b",
                            "title": "应季鲜果"
                        }
                    },
                    "is_more": true,
                    "product_list": [
                        {
                            "id": "5d1ab881b0055a0b501a2471",
                            "product_name": "翠冠梨2个 约600g",
                            "name": "翠冠梨2个 约600g",
                            "origin_price": "8.90",
                            "price": "5.99",
                            "vip_price": "",
                            "spec": "咬一口 脆甜多汁~",
                            "small_image": "https://img.ddimg.mobi/product/284656b11e13d1562326504292.jpg!deliver.product.list",
                            "category_id": "595af1ed936edf3a268d8222",
                            "sizes": [],
                            "total_sales": 7611,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6a18936edfe4568b5c37,595af1ed936edf3a268d8222",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "民生好货"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 26,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d24675bb0055a0b5d145b33",
                            "product_name": "无锡阳山水蜜桃2个 500g以上",
                            "name": "无锡阳山水蜜桃2个 500g以上",
                            "origin_price": "12.90",
                            "price": "12.90",
                            "vip_price": "",
                            "spec": "火山灰养肥肥的软桃 吃完手指都香",
                            "small_image": "https://img.ddimg.mobi/product/6b62c5b7c14ec1561014559865.jpg!deliver.product.list",
                            "category_id": "593f5c87916edff62ca6d37e",
                            "sizes": [],
                            "total_sales": 8465,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6cf9916edf7c198b4afa,593f5c87916edff62ca6d37e",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": true,
                            "stock_number": 83,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b14f5aec0a1eaaf678b4608",
                            "product_name": "泰国山竹 约500g",
                            "name": "泰国山竹 约500g",
                            "origin_price": "16.90",
                            "price": "12.90",
                            "vip_price": "",
                            "spec": "会分泌黄色果胶 部分果肉出现透明 吸引蚂蚁 均属正常",
                            "small_image": "https://img.ddimg.mobi/product/f48b8db21f921555655642057.jpg!deliver.product.list",
                            "category_id": "58fd6c07916edf7a198b4acf",
                            "sizes": [],
                            "total_sales": 8952,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6c07916edf7a198b4acf",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "白嫩果肉酸甜可口",
                                    "美味停不下来～"
                                ],
                                [
                                    "身披紫砂头顶绿冠",
                                    "分分钟触动你的味觉～"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": ""
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 29,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d2837727cdbf031026a7ba9",
                            "product_name": "陕西大荔冬枣 约400g",
                            "name": "陕西大荔冬枣 约400g",
                            "origin_price": "17.90",
                            "price": "9.90",
                            "vip_price": "",
                            "spec": "树上长的“蜜罐子”~",
                            "small_image": "https://img.ddimg.mobi/product/ea681aefceab21561515788322.jpg!deliver.product.list",
                            "category_id": "58fd6c1d916edfd62d8b4a83",
                            "sizes": [],
                            "total_sales": 8713,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6c1d916edfd62d8b4a83",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "民生好货"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 43,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d283303b0055a0b54473492",
                            "product_name": "山西油桃 约520g",
                            "name": "山西油桃 约520g",
                            "origin_price": "6.90",
                            "price": "6.90",
                            "vip_price": "",
                            "spec": "脆着吃的油桃",
                            "small_image": "https://img.ddimg.mobi/product/7890678536d311562931786217.JPG!deliver.product.list",
                            "category_id": "593f5c74916edf4f11a733c7",
                            "sizes": [],
                            "total_sales": 8182,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6cf9916edf7c198b4afa,593f5c74916edf4f11a733c7",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 25,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d08481410abf114af6652bf",
                            "product_name": "有机蓝莓 125g/盒",
                            "name": "有机蓝莓 125g/盒",
                            "origin_price": "11.90",
                            "price": "11.90",
                            "vip_price": "",
                            "spec": "绿色健康 全程有机追溯",
                            "small_image": "https://img.ddimg.mobi/product/79a5ec83a64e41560829083269.jpg!deliver.product.list",
                            "category_id": "58fd6ac3936edf89778b5bfe",
                            "sizes": [],
                            "total_sales": 8128,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6ac3936edf89778b5bfe",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "595385eb936edfb97a8cdd01",
                            "product_name": "上海本地夏黑葡萄 500g",
                            "name": "上海本地夏黑葡萄 500g",
                            "origin_price": "12.90",
                            "price": "8.90",
                            "vip_price": "",
                            "spec": "上海本地水果 来点本地人家的黑珍珠",
                            "small_image": "https://img.ddimg.mobi/product/7893ef8be53141563763699490.jpg!deliver.product.list",
                            "category_id": "593f5d0a916edf0d18921621",
                            "sizes": [],
                            "total_sales": 8538,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6d31916edf7a198b4b29,593f5d0a916edf0d18921621",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "限时尝鲜"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 9,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5cd58161b0055a0b52777e8c",
                            "product_name": "山东贝贝小番茄 500g",
                            "name": "山东贝贝小番茄 500g",
                            "origin_price": "9.90",
                            "price": "9.90",
                            "vip_price": "",
                            "spec": "娇俏玲珑 鲜艳饱满~",
                            "small_image": "https://img.ddimg.mobi/product/650cdaefa38361557496256842.jpg!deliver.product.list",
                            "category_id": "593f5d21916edf4914a73288",
                            "sizes": [],
                            "total_sales": 8923,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6d40916edf7c198b4b03,593f5d21916edf4914a73288",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 38,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5ce7c2f6b0055a0b54473477",
                            "product_name": "巨峰葡萄 500g",
                            "name": "巨峰葡萄 500g",
                            "origin_price": "12.90",
                            "price": "8.99",
                            "vip_price": "",
                            "spec": "酸甜味浓 皮薄易撕~",
                            "small_image": "https://img.ddimg.mobi/product/5bd9029dde0521562823441339.jpg!deliver.product.list",
                            "category_id": "593f5d15916edf4226a57aa7",
                            "sizes": [],
                            "total_sales": 9011,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6d31916edf7a198b4b29,593f5d15916edf4226a57aa7",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": ""
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 48,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d247743b0055a0b61500480",
                            "product_name": "云南红提 400g",
                            "name": "云南红提 400g",
                            "origin_price": "9.80",
                            "price": "9.80",
                            "vip_price": "",
                            "spec": "高原上的红宝石~",
                            "small_image": "https://img.ddimg.mobi/product/26010d46a60ec1557493821728.jpg!deliver.product.list",
                            "category_id": "593f5cd4916edfd655a2e10b",
                            "sizes": [],
                            "total_sales": 8339,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6d31916edf7a198b4b29,593f5cd4916edfd655a2e10b",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 39,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c25ebec716de13e768b794d",
                            "product_name": "泰国香水椰青1个 800g以上",
                            "name": "泰国香水椰青1个 800g以上",
                            "origin_price": "10.80",
                            "price": "10.80",
                            "vip_price": "",
                            "spec": "长在树上的矿泉水~",
                            "small_image": "https://img.ddimg.mobi/product/0459747259eaa1562815944107.jpg!deliver.product.list",
                            "category_id": "593f5c26916edf5211a75ed7",
                            "sizes": [
                                {
                                    "title": "是否打开",
                                    "id": 5,
                                    "_id": "5955a56f936edf53648cd595",
                                    "values": [
                                        {
                                            "name": "打开（建议立即饮用）",
                                            "id": 11,
                                            "_id": "5955a56f936edf53648cd597",
                                            "price": "0.00"
                                        },
                                        {
                                            "name": "不打开",
                                            "id": 10,
                                            "_id": "5955a56f936edf53648cd596",
                                            "price": "0.00"
                                        }
                                    ]
                                }
                            ],
                            "total_sales": 8980,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6bfe916edf7d198b4a78,593f5c26916edf5211a75ed7",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 31,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d3522df10abf132950d2418",
                            "product_name": "宁夏硒砂瓜1个 约15斤",
                            "name": "宁夏硒砂瓜1个 约15斤",
                            "origin_price": "34.90",
                            "price": "27.90",
                            "vip_price": "",
                            "spec": "石缝里长出的西瓜",
                            "small_image": "https://img.ddimg.mobi/product/c151254cb93c31563854733674.jpg!deliver.product.list",
                            "category_id": "59801a60936edf352d98dd31",
                            "sizes": [],
                            "total_sales": 7268,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6a3b936edfe3568b5c5c,59801a60936edf352d98dd31",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": ""
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 0,
                            "today_stockout": "",
                            "is_booking": 0
                        }
                    ]
                },
                {
                    "public_id": "5d39bc834fb797737e8c1cbf",
                    "public_name": "光明大白兔7.25",
                    "cid": 1017,
                    "meteria_id": "5d39bc404fb797b07e8c38c4",
                    "type": 5,
                    "show_dark": true,
                    "image_url": "https://img.ddimg.mobi/f851b1389c121564064819654.jpg",
                    "title": "光明大白兔",
                    "sub_title": "光明大白兔",
                    "is_pop_login": 0,
                    "link": {
                        "type": 1,
                        "data": {
                            "id": "5d39bbc14df3e363498c5805",
                            "title": "光明大白兔"
                        }
                    },
                    "is_more": true,
                    "product_list": [
                        {
                            "id": "5d2c56b97cdbf03105624b63",
                            "product_name": "明治保加利亚LB81清甜原味酸奶 100g*4罐/组",
                            "name": "明治保加利亚LB81清甜原味酸奶 100g*4罐/组",
                            "origin_price": "22.80",
                            "price": "22.80",
                            "vip_price": "",
                            "spec": "简简单单 就很美味~",
                            "small_image": "https://img.ddimg.mobi/product/25beac73a1eff1563186945837.jpg!deliver.product.list",
                            "category_id": "58fb3a67936edf89778b57d1",
                            "sizes": [],
                            "total_sales": 5008,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a67936edf89778b57d1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c8a23187b37a12d484ad46d",
                            "product_name": "【今日上架】光明优倍高品质鲜牛奶 950ml/盒",
                            "name": "【今日上架】光明优倍高品质鲜牛奶 950ml/盒",
                            "origin_price": "22.90",
                            "price": "22.90",
                            "vip_price": "",
                            "spec": "新老包装混发~",
                            "small_image": "https://img.ddimg.mobi/product/e6deb0a64f8661558091716945.jpg!deliver.product.list",
                            "category_id": "58fb3a24936edfe5568b58db",
                            "sizes": [],
                            "total_sales": 8755,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a24936edfe5568b58db",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 18,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bc8053c716de1a94f8b8112",
                            "product_name": "每日鲜语鲜牛奶 1000ml/瓶",
                            "name": "每日鲜语鲜牛奶 1000ml/瓶",
                            "origin_price": "24.90",
                            "price": "21.90",
                            "vip_price": "",
                            "spec": "2小时，从挤奶到鲜奶",
                            "small_image": "https://ddimg.ddxq.mobi/d20560329ba41541778458217.jpg!maicai.product.list",
                            "category_id": "58fb3a24936edfe5568b58db",
                            "sizes": [],
                            "total_sales": 8652,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a24936edfe5568b58db",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满35送粽子"
                                },
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "精选好货"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 8,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5968b2ee936edf5b658d653d",
                            "product_name": "延世新鲜牧场牛奶 1L/瓶",
                            "name": "延世新鲜牧场牛奶 1L/瓶",
                            "origin_price": "34.90",
                            "price": "33.90",
                            "vip_price": "",
                            "spec": "韩国原装进口 来自延世牧场的新鲜问候",
                            "small_image": "https://ddimg.ddxq.mobi/ab052894ee1d881541952046214.jpg!maicai.product.list",
                            "category_id": "58fb3a24936edfe5568b58db",
                            "sizes": [],
                            "total_sales": 8756,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a24936edfe5568b58db",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "안녕하세요！",
                                    "来自延世的问候"
                                ],
                                [
                                    "1杯鲜奶营养一天",
                                    "喝过的人都说好~"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满35送粽子"
                                },
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "限时热卖"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5ccffb2d7cdbf00b5630e3a7",
                            "product_name": "达能碧悠原味发酵乳 100g*8杯/组",
                            "name": "达能碧悠原味发酵乳 100g*8杯/组",
                            "origin_price": "16.80",
                            "price": "16.80",
                            "vip_price": "",
                            "spec": "入口浓郁绵密 富有层次感",
                            "small_image": "https://img.ddimg.mobi/product/f3cc03136a2de1557134470379.jpg!deliver.product.list",
                            "category_id": "58fb3a67936edf89778b57d1",
                            "sizes": [],
                            "total_sales": 7735,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a67936edf89778b57d1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5a671199c0a1ea967d8b45c0",
                            "product_name": "优诺优丝原味风味发酵乳 135g*3杯",
                            "name": "优诺优丝原味风味发酵乳 135g*3杯",
                            "origin_price": "23.90",
                            "price": "23.90",
                            "vip_price": "",
                            "spec": "生乳发酵 口感浓郁",
                            "small_image": "https://img.ddimg.mobi/product/e2f393a58a5d41546472351514.jpg!maicai.product.list",
                            "category_id": "58fb3a67936edf89778b57d1",
                            "sizes": [],
                            "total_sales": 8483,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a67936edf89778b57d1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 9,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5a3a4e9f6ec2c40d6c8b45e1",
                            "product_name": "达能碧悠草莓果粒风味发酵乳 115g*6杯/组",
                            "name": "达能碧悠草莓果粒风味发酵乳 115g*6杯/组",
                            "origin_price": "20.80",
                            "price": "20.80",
                            "vip_price": "",
                            "spec": "入口浓郁绵密 富有层次感",
                            "small_image": "https://ddimg.ddxq.mobi/25f338581513843129476.jpg!maicai.product.list",
                            "category_id": "58fb3a67936edf89778b57d1",
                            "sizes": [],
                            "total_sales": 8284,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a67936edf89778b57d1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "草莓风味酸奶",
                                    "口感浓郁有层次感"
                                ],
                                [
                                    "益生菌发酵",
                                    "美味和健康同享"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c972f922b12be5f0a3fe77c",
                            "product_name": "明治活俪低脂肪酸奶 100g*4杯",
                            "name": "明治活俪低脂肪酸奶 100g*4杯",
                            "origin_price": "22.80",
                            "price": "22.80",
                            "vip_price": "",
                            "spec": "减脂的你值得拥有~",
                            "small_image": "https://img.ddimg.mobi/product/4a85e09b4aff41553412044588.png!deliver.product.list",
                            "category_id": "58fb3a67936edf89778b57d1",
                            "sizes": [],
                            "total_sales": 7437,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a67936edf89778b57d1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59c1d5206ec2c45d278b4574",
                            "product_name": "蒙牛纯牛奶 250ml*24盒/箱",
                            "name": "蒙牛纯牛奶 250ml*24盒/箱",
                            "origin_price": "59.90",
                            "price": "59.90",
                            "vip_price": "",
                            "spec": "新老包装混发~",
                            "small_image": "https://img.ddimg.mobi/product/8fde03a8724df1551421031720.png!deliver.product.list",
                            "category_id": "58fb39fe936edfe4568b58ad",
                            "sizes": [],
                            "total_sales": 8235,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb39fe936edfe4568b58ad",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "高温灭菌无菌灌装",
                                    "口感细腻爽滑"
                                ],
                                [
                                    "常温保存直接饮用",
                                    "营养更易吸收"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 8,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59140876936edf720496e478",
                            "product_name": "伊利安慕希酸奶（原味） 205g*12盒/箱",
                            "name": "伊利安慕希酸奶（原味） 205g*12盒/箱",
                            "origin_price": "59.80",
                            "price": "49.90",
                            "vip_price": "",
                            "spec": "浓浓的 超好喝（新老包装交替发货）",
                            "small_image": "https://ddimg.ddxq.mobi/35816a90cb2f21524215021811.jpg!maicai.product.list",
                            "category_id": "58fb39fe936edfe4568b58ad",
                            "sizes": [],
                            "total_sales": 8286,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb39fe936edfe4568b58ad",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "精选好货"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 19,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58ef5d60916edfc84cca0f78",
                            "product_name": "光明纯牛奶 250ml*24盒/箱",
                            "name": "光明纯牛奶 250ml*24盒/箱",
                            "origin_price": "62.00",
                            "price": "62.00",
                            "vip_price": "",
                            "spec": "经典纯正 常温早餐奶，新老包装交替中哦",
                            "small_image": "https://img.ddimg.mobi/product/88e251a7c8bb11551233734480.jpg!deliver.product.list",
                            "category_id": "58fb39fe936edfe4568b58ad",
                            "sizes": [],
                            "total_sales": 8408,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb39fe936edfe4568b58ad",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 1,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5d31c1dd7cdbf031026a7baf",
                            "product_name": "光明大白兔奶糖风味牛奶 200ml*12瓶/箱",
                            "name": "光明大白兔奶糖风味牛奶 200ml*12瓶/箱",
                            "origin_price": "59.90",
                            "price": "59.90",
                            "vip_price": "",
                            "spec": "匠心传承 甜蜜滋味",
                            "small_image": "https://img.ddimg.mobi/product/92cb7cc8cf5421563542090466.jpg!deliver.product.list",
                            "category_id": "58fb39fe936edfe4568b58ad",
                            "sizes": [],
                            "total_sales": 4601,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb39fe936edfe4568b58ad",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 0,
                            "today_stockout": "",
                            "is_booking": 0
                        }
                    ]
                },
                {
                    "public_id": "5d39beeb4fb7973d7e8c1b53",
                    "public_name": "粮油调味满赠7.26",
                    "cid": 1019,
                    "meteria_id": "5d39be1b4ed5bd8a1e8c2f8a",
                    "type": 5,
                    "show_dark": true,
                    "image_url": "https://img.ddimg.mobi/00d161a28ff041564065254419.jpg",
                    "title": "粮油满赠",
                    "sub_title": "粮油满赠",
                    "is_pop_login": 0,
                    "link": {
                        "type": 1,
                        "data": {
                            "id": "5d39bd2e4ed5bd1b1e8c333c",
                            "title": "粮油满赠"
                        }
                    },
                    "is_more": true,
                    "product_list": [
                        {
                            "id": "5bed6b2f716de100468c55a2",
                            "product_name": "盐田稻米 5kg/袋",
                            "name": "盐田稻米 5kg/袋",
                            "origin_price": "43.90",
                            "price": "43.90",
                            "vip_price": "",
                            "spec": "复垦盐田 优质米",
                            "small_image": "https://img.ddimg.mobi/product/66a5b6899bfa51543153183729.jpg!maicai.product.list",
                            "category_id": "58fb3af5936edfe6568b5a05",
                            "sizes": [],
                            "total_sales": 6571,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e58b936edfe2568b580d,58fb3af5936edfe6568b5a05",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 2,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b45ed11c0a1ea173b8c2390",
                            "product_name": "粮管家乳玉香米 5kg/袋",
                            "name": "粮管家乳玉香米 5kg/袋",
                            "origin_price": "44.80",
                            "price": "35.90",
                            "vip_price": "",
                            "spec": "乳白似玉 软糯香甜",
                            "small_image": "https://img.ddimg.mobi/product/a0eed545c1d561543164666286.png!maicai.product.list",
                            "category_id": "58fb3af5936edfe6568b5a05",
                            "sizes": [],
                            "total_sales": 8791,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e58b936edfe2568b580d,58fb3af5936edfe6568b5a05",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                },
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "精选好货"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 11,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5cc27577ca2034756b24b2f0",
                            "product_name": "福临门一级大豆油 5L/桶",
                            "name": "福临门一级大豆油 5L/桶",
                            "origin_price": "43.90",
                            "price": "43.90",
                            "vip_price": "",
                            "spec": "油品清亮透彻 煎炒少油烟~",
                            "small_image": "https://img.ddimg.mobi/product/4770368dff5771557824134789.jpg!deliver.product.list",
                            "category_id": "58fb3b1c936edf89778b57e7",
                            "sizes": [],
                            "total_sales": 6259,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e58b936edfe2568b580d,58fb3b1c936edf89778b57e7",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58cb624f916edfb84cc58821",
                            "product_name": "欣和六月鲜特级酱油 500ml/瓶",
                            "name": "欣和六月鲜特级酱油 500ml/瓶",
                            "origin_price": "13.90",
                            "price": "13.90",
                            "vip_price": "",
                            "spec": "减盐生抽 凉拌菜首选六月鲜",
                            "small_image": "https://ddimg.ddxq.mobi/fa42b18aebe661541953964382.jpg!maicai.product.list",
                            "category_id": "58fb3b89936edfe4568b58ec",
                            "sizes": [],
                            "total_sales": 8824,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3b89936edfe4568b58ec",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "六个月足期发酵",
                                    "精选原料 用心酿造"
                                ],
                                [
                                    "淡口鲜酱油",
                                    "给家人吃好点很有必要"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 15,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b9d1068c0a1ea8f1c8b7ae5",
                            "product_name": "鲁花芝麻香油 180ml/瓶",
                            "name": "鲁花芝麻香油 180ml/瓶",
                            "origin_price": "12.90",
                            "price": "12.90",
                            "vip_price": "",
                            "spec": "压榨研磨 滴滴香醇",
                            "small_image": "https://ddimg.ddxq.mobi/e5d51100ed92a1537042216163.JPG!maicai.product.list",
                            "category_id": "58fb3bcc936edfe6568b5a27",
                            "sizes": [],
                            "total_sales": 8056,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3bcc936edfe6568b5a27",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58b7bbca936edfaa323cfdaf",
                            "product_name": "好侍百梦多咖喱（原味） 100g/盒",
                            "name": "好侍百梦多咖喱（原味） 100g/盒",
                            "origin_price": "10.80",
                            "price": "10.80",
                            "vip_price": "",
                            "spec": "口感柔和 咖喱鸡块建议用两块哦~",
                            "small_image": "https://img.ddimg.mobi/product/9d296fb839d1b1546598167318.jpg!maicai.product.list",
                            "category_id": "58fb3bb5936edfe5568b5909",
                            "sizes": [],
                            "total_sales": 8678,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3bb5936edfe5568b5909",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 10,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b9d102cc0a1ea8f1c8b7ab9",
                            "product_name": "鲁花自然香料酒 500ml/瓶",
                            "name": "鲁花自然香料酒 500ml/瓶",
                            "origin_price": "8.90",
                            "price": "8.90",
                            "vip_price": "",
                            "spec": "增香添味 浓郁醇厚",
                            "small_image": "https://ddimg.ddxq.mobi/6d58a85eb2ee51537041952865.JPG!maicai.product.list",
                            "category_id": "58fb3bc1936edfe4568b58f9",
                            "sizes": [],
                            "total_sales": 8262,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3bc1936edfe4568b58f9",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 2,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5979c9d2916edf4914f65166",
                            "product_name": "三添芝麻油 250ml/瓶",
                            "name": "三添芝麻油 250ml/瓶",
                            "origin_price": "19.90",
                            "price": "19.90",
                            "vip_price": "",
                            "spec": "传统老字号 适合各种烹饪",
                            "small_image": "https://img.ddimg.mobi/product/145255d3c040d1563844366766.png!deliver.product.list",
                            "category_id": "58fb3bcc936edfe6568b5a27",
                            "sizes": [],
                            "total_sales": 8249,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3bcc936edfe6568b5a27",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b7bdb2201a6eaaf048c43f9",
                            "product_name": "丘比沙拉酱香甜味 150g/袋",
                            "name": "丘比沙拉酱香甜味 150g/袋",
                            "origin_price": "9.80",
                            "price": "9.80",
                            "vip_price": "",
                            "spec": "好拿好挤好方便~",
                            "small_image": "https://img.ddimg.mobi/product/f4ad9d75005661556091674283.jpg!deliver.product.list",
                            "category_id": "58fb3bb5936edfe5568b5909",
                            "sizes": [],
                            "total_sales": 8008,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3bb5936edfe5568b5909",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 2,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c777f617b37a12d343ba1d8",
                            "product_name": "莫顿牌（未加碘）海盐 400g/罐",
                            "name": "莫顿牌（未加碘）海盐 400g/罐",
                            "origin_price": "16.80",
                            "price": "16.80",
                            "vip_price": "",
                            "spec": "颗粒均匀 咸中带鲜~",
                            "small_image": "https://img.ddimg.mobi/product/24d64933838b11551335332050.jpg!deliver.product.list",
                            "category_id": "58fb3b9b936edfc0408b586c",
                            "sizes": [],
                            "total_sales": 7080,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3b9b936edfc0408b586c",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 1,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b7bbcca01a6eaaf048ba93f",
                            "product_name": "恒顺镇江香醋六年陈 580ml/瓶",
                            "name": "恒顺镇江香醋六年陈 580ml/瓶",
                            "origin_price": "24.90",
                            "price": "24.90",
                            "vip_price": "",
                            "spec": "酸而不涩，香而微甜~",
                            "small_image": "https://img.ddimg.mobi/product/b8270f4b8d6111548121294032.jpg!deliver.product.list",
                            "category_id": "58fb3bc1936edfe4568b58f9",
                            "sizes": [],
                            "total_sales": 6972,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3bc1936edfe4568b58f9",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5ca56456ca2034756c3c4874",
                            "product_name": "老恒和原酿料酒 1.28L/瓶",
                            "name": "老恒和原酿料酒 1.28L/瓶",
                            "origin_price": "16.80",
                            "price": "13.90",
                            "vip_price": "",
                            "spec": " 去腥解腻 五年陈酿",
                            "small_image": "https://img.ddimg.mobi/product/fc75e0bafe1c91554347074574.jpg!deliver.product.list",
                            "category_id": "58fb3bc1936edfe4568b58f9",
                            "sizes": [],
                            "total_sales": 7817,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3bc1936edfe4568b58f9",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满49赠大米1袋"
                                },
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "热销72小时"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 0,
                            "today_stockout": "",
                            "is_booking": 0
                        }
                    ]
                },
                {
                    "type": 13,
                    "show_dark": true,
                    "is_more": false,
                    "page": 1,
                    "product_list": [
                        {
                            "id": "58f8235e916edfca4ccb825c",
                            "product_name": "康师傅大食代红烧牛肉面 5包/袋",
                            "name": "康师傅大食代红烧牛肉面 5包/袋",
                            "origin_price": "15.90",
                            "price": "15.90",
                            "vip_price": "",
                            "spec": "124g*5包 大块满足 畅快分享",
                            "small_image": "https://img.ddimg.mobi/product/73729284b788d1558072397291.jpg!deliver.product.list",
                            "category_id": "58fb40f8936edfe3568b591e",
                            "sizes": [],
                            "total_sales": 8264,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,58fb40f8936edfe3568b591e",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 5,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59b89ee86ec2c40a4d8b4611",
                            "product_name": "沈大成鲜肉虾仁小馄饨 120g/袋",
                            "name": "沈大成鲜肉虾仁小馄饨 120g/袋",
                            "origin_price": "8.90",
                            "price": "8.90",
                            "vip_price": "",
                            "spec": "香浓软滑 肉质鲜嫩",
                            "small_image": "https://ddimg.ddxq.mobi/6e3232521505279920863.jpg!maicai.product.list",
                            "category_id": "5b0ffb3845cd42cb548c913c",
                            "sizes": [],
                            "total_sales": 8451,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,5b0ffb3845cd42cb548c913c",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满35送粽子"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 2,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "599b8ba4936edf990d8e98ee",
                            "product_name": "康师傅鲜虾鱼板面 98g/盒",
                            "name": "康师傅鲜虾鱼板面 98g/盒",
                            "origin_price": "4.50",
                            "price": "3.90",
                            "vip_price": "",
                            "spec": "新老包装交替~",
                            "small_image": "https://ddimg.ddxq.mobi/02a7557cb9ab1503365698396.jpg!maicai.product.list",
                            "category_id": "58fb40f8936edfe3568b591e",
                            "sizes": [],
                            "total_sales": 8010,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,58fb40f8936edfe3568b591e",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "限时特惠"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 5,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "598d08d8936edf7b3d8c9f56",
                            "product_name": "康师傅红烧牛肉面 106g/盒",
                            "name": "康师傅红烧牛肉面 106g/盒",
                            "origin_price": "4.50",
                            "price": "4.50",
                            "vip_price": "",
                            "spec": "新老包装交替~",
                            "small_image": "https://ddimg.ddxq.mobi/80d24d5deeb461502441357484.jpg!maicai.product.list",
                            "category_id": "58fb40f8936edfe3568b591e",
                            "sizes": [],
                            "total_sales": 8682,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,58fb40f8936edfe3568b591e",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 10,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59f991d56ec2c4d21c8b4617",
                            "product_name": "金沙河原味鸡蛋挂面 900g/袋",
                            "name": "金沙河原味鸡蛋挂面 900g/袋",
                            "origin_price": "11.90",
                            "price": "11.90",
                            "vip_price": "",
                            "spec": "鸡蛋麦香 营养加倍",
                            "small_image": "https://ddimg.ddxq.mobi/6d84c0961509605342118.jpg!maicai.product.list",
                            "category_id": "58fb3b03936edf89778b57e1",
                            "sizes": [],
                            "total_sales": 8554,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e58b936edfe2568b580d,58fb3b03936edf89778b57e1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 16,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5975d845936edfb35d8c8fa3",
                            "product_name": "统一老坛酸菜牛肉面 120g/盒",
                            "name": "统一老坛酸菜牛肉面 120g/盒",
                            "origin_price": "4.90",
                            "price": "4.90",
                            "vip_price": "",
                            "spec": "方便面的酸爽宗师",
                            "small_image": "https://ddimg.ddxq.mobi/142705490644a1500895121677.jpg!maicai.product.list",
                            "category_id": "58fb40f8936edfe3568b591e",
                            "sizes": [],
                            "total_sales": 8531,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,58fb40f8936edfe3568b591e",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 17,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58ee352e916edff84cca693d",
                            "product_name": "湾仔码头玉米蔬菜猪肉馅水饺 720g/袋",
                            "name": "湾仔码头玉米蔬菜猪肉馅水饺 720g/袋",
                            "origin_price": "33.90",
                            "price": "33.90",
                            "vip_price": "",
                            "spec": "肉质鲜美弹嫩 馅大皮薄汁多",
                            "small_image": "https://ddimg.ddxq.mobi/507b0e634eed21502974059227.png!maicai.product.list",
                            "category_id": "5b0ffb3845cd42cb548c913c",
                            "sizes": [],
                            "total_sales": 8370,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,5b0ffb3845cd42cb548c913c",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58ff1ecb936edf777a8b4f95",
                            "product_name": "家乐浓汤宝（老母鸡汤口味） 64g/盒（2块装）",
                            "name": "家乐浓汤宝（老母鸡汤口味） 64g/盒（2块装）",
                            "origin_price": "5.90",
                            "price": "5.90",
                            "vip_price": "",
                            "spec": "让家常菜美味升级的法宝哦~",
                            "small_image": "https://ddimg.ddxq.mobi/f4b29952560f61493114470644.jpg!maicai.product.list",
                            "category_id": "58fb3bb5936edfe5568b5909",
                            "sizes": [],
                            "total_sales": 8202,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3bb5936edfe5568b5909",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58bf8d1a936edf72323d9bfc",
                            "product_name": "清美内酯豆腐 400g/盒",
                            "name": "清美内酯豆腐 400g/盒",
                            "origin_price": "2.00",
                            "price": "2.00",
                            "vip_price": "",
                            "spec": "质地细嫩 色香味均优于其他普通豆腐",
                            "small_image": "https://img.ddimg.mobi/product/2f9f42dd5c3311558682395205.jpg!deliver.product.list",
                            "category_id": "58fbf508936edfe3568b599f",
                            "sizes": [],
                            "total_sales": 9055,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d233936edfe3568b5655,58fbf508936edfe3568b599f",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 37,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58b8d04e916edfb44cc26a9d",
                            "product_name": "土鸡蛋8枚",
                            "name": "土鸡蛋8枚",
                            "origin_price": "9.90",
                            "price": "6.90",
                            "vip_price": "",
                            "spec": "民生鸡蛋 物美价廉",
                            "small_image": "https://img.ddimg.mobi/product/2d489406e91691544062166784.jpg!maicai.product.list",
                            "category_id": "58fa233c916edf7c198b4972",
                            "sizes": [],
                            "total_sales": 9072,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e539936edf89778b567f,58fa233c916edf7c198b4972",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "蛋黄橙红饱满",
                                    "蛋白弹嫩细滑"
                                ],
                                [
                                    "鲜香可口自然美味",
                                    "给家人值得上好食材"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "民生好货"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 146,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5ba2859fd033a1de7d8b4c0f",
                            "product_name": "鲜手擀面 300g/盒",
                            "name": "鲜手擀面 300g/盒",
                            "origin_price": "3.00",
                            "price": "3.00",
                            "vip_price": "",
                            "spec": "够劲道的好面~",
                            "small_image": "https://ddimg.ddxq.mobi/5e805bc3e9ebf1537628787739.jpg!maicai.product.list",
                            "category_id": "58fb3b03936edf89778b57e1",
                            "sizes": [],
                            "total_sales": 9024,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e58b936edfe2568b580d,58fb3b03936edf89778b57e1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 17,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5c1364e6716de1e77d8b61d9",
                            "product_name": "恒都精选冷冻肥牛卷 300g",
                            "name": "恒都精选冷冻肥牛卷 300g",
                            "origin_price": "25.80",
                            "price": "25.80",
                            "vip_price": "",
                            "spec": "肉质细腻 口感弹嫩",
                            "small_image": "https://img.ddimg.mobi/product/dd6461d23af591548470818889.jpg!deliver.product.list",
                            "category_id": "5ad476cbc3c442736a8b4a50",
                            "sizes": [],
                            "total_sales": 8889,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e51f936edf88198b5718,5ad476cbc3c442736a8b4a50",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 16,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59e453586ec2c45e358b45b2",
                            "product_name": "民维大牧汗羔羊肉片 220g",
                            "name": "民维大牧汗羔羊肉片 220g",
                            "origin_price": "25.90",
                            "price": "25.90",
                            "vip_price": "",
                            "spec": "源自内蒙好羔羊 涮炒煲汤都好吃",
                            "small_image": "https://img.ddimg.mobi/product/99525c1c2a9ad1548473873455.jpg!deliver.product.list",
                            "category_id": "58fa21cd936edf88198b57cf",
                            "sizes": [],
                            "total_sales": 8674,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e527936edfe2568b57fa,58fa21cd936edf88198b57cf",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "大牧汗金牌品质",
                                    "你没吃过的天赐美味"
                                ],
                                [
                                    "天然放养无膻味",
                                    "淡淡奶香花草味"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58c40ce3936edf38323f06e7",
                            "product_name": "沪尚鸭血 360g/盒",
                            "name": "沪尚鸭血 360g/盒",
                            "origin_price": "3.90",
                            "price": "3.90",
                            "vip_price": "",
                            "spec": "盒装鸭血 Q弹有韧性 人体清道夫",
                            "small_image": "https://img.ddimg.mobi/product/0756d9b94e1fd1548236284999.jpg!deliver.product.list",
                            "category_id": "5b0ff20d06752ead258bbb49",
                            "sizes": [],
                            "total_sales": 8957,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e531936edfe5568b5747,5b0ff20d06752ead258bbb49",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 24,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59a51abc936edf6f27933be9",
                            "product_name": "大昌美国杂菜 200g/袋",
                            "name": "大昌美国杂菜 200g/袋",
                            "origin_price": "6.90",
                            "price": "6.90",
                            "vip_price": "",
                            "spec": "无添加 开袋即烹超便捷",
                            "small_image": "https://ddimg.ddxq.mobi/ed848ca670a6f1504064745559.png!maicai.product.list",
                            "category_id": "5a053f42936edf450ca359f5",
                            "sizes": [],
                            "total_sales": 8902,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "5a053f42936edf450ca359f5",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 11,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5a4cbb1a6ec2c45a1e8b456e",
                            "product_name": "龙凤黑芝麻汤圆 200g/袋",
                            "name": "龙凤黑芝麻汤圆 200g/袋",
                            "origin_price": "8.80",
                            "price": "8.80",
                            "vip_price": "",
                            "spec": "口感细腻 香糯不粘牙",
                            "small_image": "https://ddimg.ddxq.mobi/eac4f136a54cc1538990793402.jpg!maicai.product.list",
                            "category_id": "5b0ffb3845cd42cb548c913c",
                            "sizes": [],
                            "total_sales": 8868,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,5b0ffb3845cd42cb548c913c",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满35送粽子"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 9,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59958b6b936edf182e900604",
                            "product_name": "乡吧佬卤蛋 25g/只",
                            "name": "乡吧佬卤蛋 25g/只",
                            "origin_price": "1.00",
                            "price": "1.00",
                            "vip_price": "",
                            "spec": "新老包装更新中 文火慢卤 充分入味",
                            "small_image": "https://ddimg.ddxq.mobi/e13725751514881445681.jpg!maicai.product.list",
                            "category_id": "5b0ff8d306752e25278bdb24",
                            "sizes": [],
                            "total_sales": 9028,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "59701e80936edf4f38915857,5b0ff8d306752e25278bdb24",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 66,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5a2f831d6ec2c4b66c8b4620",
                            "product_name": "怡宝纯净水 4.5L/瓶",
                            "name": "怡宝纯净水 4.5L/瓶",
                            "origin_price": "9.80",
                            "price": "9.80",
                            "vip_price": "",
                            "spec": "滴滴纯净 喝出生活的质量",
                            "small_image": "https://ddimg.ddxq.mobi/61e716cea52621523612653053.jpg!maicai.product.list",
                            "category_id": "58fb4109936edf88198b595b",
                            "sizes": [],
                            "total_sales": 8956,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5c4936edfe4568b5793,58fb4109936edf88198b595b",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 61,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58f6d97b936edf0032499a97",
                            "product_name": "白猫柠檬红茶洗洁精 500g/瓶",
                            "name": "白猫柠檬红茶洗洁精 500g/瓶",
                            "origin_price": "4.80",
                            "price": "4.80",
                            "vip_price": "",
                            "spec": "双手和餐具 油腻去无踪",
                            "small_image": "https://ddimg.ddxq.mobi/1c589590ed8271492400622407.jpg!maicai.product.list",
                            "category_id": "58f9e5cc936edfe6568b5897",
                            "sizes": [],
                            "total_sales": 8778,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5cc936edfe6568b5897",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 35,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58f57016916edf154dcb1551",
                            "product_name": "泰国进口超甜龙眼 500g",
                            "name": "泰国进口超甜龙眼 500g",
                            "origin_price": "10.90",
                            "price": "8.90",
                            "vip_price": "",
                            "spec": "色泽晶莹 柔软细嫩",
                            "small_image": "https://img.ddimg.mobi/product/de02c34be37991544521921435.jpg!maicai.product.list",
                            "category_id": "58fd6b9c916edf7a198b4a93",
                            "sizes": [],
                            "total_sales": 9023,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58fd663f936edfe3568b5c15,58fd6b9c916edf7a198b4a93",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "美味“夜明珠”",
                                    "颜如玉 甜如蜜"
                                ],
                                [
                                    "鲜食享美味",
                                    "营养好炖品"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": ""
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 1,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58bf91a3936edff5313e081b",
                            "product_name": "清美盐卤五香干 120g/袋",
                            "name": "清美盐卤五香干 120g/袋",
                            "origin_price": "2.90",
                            "price": "2.90",
                            "vip_price": "",
                            "spec": "新老包装交替中 皖北风味~",
                            "small_image": "https://ddimg.ddxq.mobi/0ee98edc76e5c1539672112924.jpg!maicai.product.list",
                            "category_id": "58fbf528936edfe6568b5ad7",
                            "sizes": [],
                            "total_sales": 9049,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d233936edfe3568b5655,58fbf528936edfe6568b5ad7",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 26,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "595ca3fb936edf2e4c8d5d8b",
                            "product_name": "苏北草鸡蛋6枚",
                            "name": "苏北草鸡蛋6枚",
                            "origin_price": "9.90",
                            "price": "9.90",
                            "vip_price": "",
                            "spec": "用做一份蒸蛋的时间 来享受生活",
                            "small_image": "https://img.ddimg.mobi/product/7a6a8542735081544061879340.jpg!maicai.product.list",
                            "category_id": "58fa233c916edf7c198b4972",
                            "sizes": [],
                            "total_sales": 9033,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e539936edf89778b567f,58fa233c916edf7c198b4972",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58c3a44e936edf50323e083b",
                            "product_name": "光明优倍高品质鲜牛奶 950ml/盒",
                            "name": "光明优倍高品质鲜牛奶 950ml/盒",
                            "origin_price": "21.90",
                            "price": "21.90",
                            "vip_price": "",
                            "spec": "上市三天内鲜奶，非当日上架",
                            "small_image": "https://ddimg.ddxq.mobi/11782b07f255581541952013337.jpg!maicai.product.list",
                            "category_id": "58fb3a24936edfe5568b58db",
                            "sizes": [],
                            "total_sales": 9002,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a24936edfe5568b58db",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "每天一杯鲜牛奶",
                                    "享受美好生活滋味~"
                                ],
                                [
                                    "好奶源 滴滴浓醇",
                                    "今天，你喝奶了吗？"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满35送粽子"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5ba285cad033a1de7d8b4c2e",
                            "product_name": "鲜饺子皮 300g/盒",
                            "name": "鲜饺子皮 300g/盒",
                            "origin_price": "4.50",
                            "price": "4.50",
                            "vip_price": "",
                            "spec": "面皮很香 闻着就知道不简单~",
                            "small_image": "https://ddimg.ddxq.mobi/a488fe6151abf1537628601150.jpg!maicai.product.list",
                            "category_id": "58fb3b03936edf89778b57e1",
                            "sizes": [],
                            "total_sales": 8911,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e58b936edfe2568b580d,58fb3b03936edf89778b57e1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 7,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "596dd254936edf08258f9d98",
                            "product_name": "中粮家佳康冰鲜梅花肉丝 240g",
                            "name": "中粮家佳康冰鲜梅花肉丝 240g",
                            "origin_price": "12.90",
                            "price": "12.90",
                            "vip_price": "",
                            "spec": "餐桌百搭食材 肉质柔软可口~",
                            "small_image": "https://img.ddimg.mobi/product/20defb2ed9c5e1548404062876.jpg!deliver.product.list",
                            "category_id": "58fa212d936edfe2568b588d",
                            "sizes": [],
                            "total_sales": 9030,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e514936edfe3568b572e,58fa212d936edfe2568b588d",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "肉质鲜嫩",
                                    "色泽纯正"
                                ],
                                [
                                    "肥瘦相间",
                                    "口感细腻"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 25,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5ad47427c0a1ea1f538b45a3",
                            "product_name": "恒都精选冷冻牛腩块 250g",
                            "name": "恒都精选冷冻牛腩块 250g",
                            "origin_price": "16.90",
                            "price": "16.90",
                            "vip_price": "",
                            "spec": "源自青壮小公牛~赞",
                            "small_image": "https://img.ddimg.mobi/product/738706cb8b5081548471186932.jpg!deliver.product.list",
                            "category_id": "58fa2059936edf89778b56e5",
                            "sizes": [],
                            "total_sales": 8988,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e51f936edf88198b5718,58fa2059936edf89778b56e5",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "奶香浓郁",
                                    "纹理清晰有嚼劲"
                                ],
                                [
                                    "谷物精养品质精选",
                                    "家常炖烧人气食材"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b8ce576c0a1ea3a278b8898",
                            "product_name": "恒都精选冷冻羊肉卷 350g",
                            "name": "恒都精选冷冻羊肉卷 350g",
                            "origin_price": "29.90",
                            "price": "29.90",
                            "vip_price": "",
                            "spec": "涮火锅能少的了我？",
                            "small_image": "https://img.ddimg.mobi/product/233a0314b122a1548470947094.jpg!deliver.product.list",
                            "category_id": "58fa21cd936edf88198b57cf",
                            "sizes": [],
                            "total_sales": 8676,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e527936edfe2568b57fa,58fa21cd936edf88198b57cf",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "https://img.ddimg.mobi/cf47783c866d81564663974316.png",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bd7b850716de100468bd3f6",
                            "product_name": "农百鲜冷冻鸡中翅 400g",
                            "name": "农百鲜冷冻鸡中翅 400g",
                            "origin_price": "29.80",
                            "price": "29.80",
                            "vip_price": "",
                            "spec": "鲜嫩香醇 口感细腻（新老包装交替）",
                            "small_image": "https://img.ddimg.mobi/product/09ff6aa1148f61548468262904.jpg!deliver.product.list",
                            "category_id": "58fa21e9936edfc0408b57b7",
                            "sizes": [],
                            "total_sales": 8909,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e531936edfe5568b5747,58fa21e9936edfc0408b57b7",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 11,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5ad30145c0a1ead23f8b4588",
                            "product_name": "新雅大厨半成品炸猪排 225g",
                            "name": "新雅大厨半成品炸猪排 225g",
                            "origin_price": "24.90",
                            "price": "24.90",
                            "vip_price": "",
                            "spec": "新雅镇店菜肴 在家就能享受~",
                            "small_image": "https://img.ddimg.mobi/product/5fbc32e401cf61548474224918.jpg!deliver.product.list",
                            "category_id": "5a053f42936edf450ca359f5",
                            "sizes": [],
                            "total_sales": 8433,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "5a053f42936edf450ca359f5",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58b7ee6b936edf20323c1177",
                            "product_name": "乌江清爽榨菜 80g/袋",
                            "name": "乌江清爽榨菜 80g/袋",
                            "origin_price": "2.50",
                            "price": "2.50",
                            "vip_price": "",
                            "spec": "开袋食用后请冷藏储存",
                            "small_image": "https://img.ddimg.mobi/product/0b452859162b51544014167169.jpg!maicai.product.list",
                            "category_id": "58fb40ec936edf42508b45cd",
                            "sizes": [],
                            "total_sales": 8983,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,58fb40ec936edf42508b45cd",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 55,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "597025bb916edfa811e41691",
                            "product_name": "卫龙香辣味大面筋 65g/袋",
                            "name": "卫龙香辣味大面筋 65g/袋",
                            "origin_price": "3.50",
                            "price": "3.50",
                            "vip_price": "",
                            "spec": "一口一根 原汁原味",
                            "small_image": "https://ddimg.ddxq.mobi/e6a8197d785ac1541952317876.jpg!maicai.product.list",
                            "category_id": "5b0ff8d306752e25278bdb24",
                            "sizes": [],
                            "total_sales": 8963,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "59701e80936edf4f38915857,5b0ff8d306752e25278bdb24",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 44,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5ab23cf0c0a1ea5a628b45d6",
                            "product_name": "百事可乐 600ml/瓶",
                            "name": "百事可乐 600ml/瓶",
                            "origin_price": "3.00",
                            "price": "3.00",
                            "vip_price": "",
                            "spec": "兹兹气泡声是我独特的标志",
                            "small_image": "https://img.ddimg.mobi/product/693c4947ce4381543154544133.jpg!maicai.product.list",
                            "category_id": "58fb4119936edfe6568b5a53",
                            "sizes": [],
                            "total_sales": 8944,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5c4936edfe4568b5793,58fb4119936edfe6568b5a53",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 13,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58f81ebc916edf2f4dcb68b6",
                            "product_name": "维达超韧系列纸面巾 130抽/包",
                            "name": "维达超韧系列纸面巾 130抽/包",
                            "origin_price": "4.90",
                            "price": "4.90",
                            "vip_price": "",
                            "spec": "人气小S码 超韧细密 湿水不易破",
                            "small_image": "https://ddimg.ddxq.mobi/e66496081691c1492420154145.jpg!maicai.product.list",
                            "category_id": "58f9e5cc936edfe6568b5897",
                            "sizes": [],
                            "total_sales": 8629,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5cc936edfe6568b5897",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 5,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58eec070936edf9832464a4a",
                            "product_name": "金针菇 150g",
                            "name": "金针菇 150g",
                            "origin_price": "0.99",
                            "price": "0.99",
                            "vip_price": "",
                            "spec": "凉拌炖汤 家常小菜怎能少了它",
                            "small_image": "https://img.ddimg.mobi/product/e8d50834520071544616778931.jpg!maicai.product.list",
                            "category_id": "58fbf4ed936edfe6568b5ace",
                            "sizes": [],
                            "total_sales": 9070,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4ed936edfe6568b5ace",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 132,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59537715936edf11608c3a1d",
                            "product_name": "汉康苏北老豆腐 400g/袋",
                            "name": "汉康苏北老豆腐 400g/袋",
                            "origin_price": "4.90",
                            "price": "4.90",
                            "vip_price": "",
                            "spec": "色泽洁白 口感嫩滑而紧实",
                            "small_image": "https://img.ddimg.mobi/product/2fcc2d6e7b50e1558670127199.jpg!deliver.product.list",
                            "category_id": "58fbf508936edfe3568b599f",
                            "sizes": [],
                            "total_sales": 9007,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d233936edfe3568b5655,58fbf508936edfe3568b599f",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "豆香味浓",
                                    "纯正浓郁 清香四溢"
                                ],
                                [
                                    "弹性十足",
                                    "味道鲜美 "
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 26,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58ba74eb936edf3a323d3159",
                            "product_name": "洋鸡蛋10枚",
                            "name": "洋鸡蛋10枚",
                            "origin_price": "7.90",
                            "price": "7.90",
                            "vip_price": "",
                            "spec": "胆固醇和脂肪更低 适合爷爷奶奶",
                            "small_image": "https://img.ddimg.mobi/product/dfc6e1ba03bc21544171340138.jpg!maicai.product.list",
                            "category_id": "58fa233c916edf7c198b4972",
                            "sizes": [],
                            "total_sales": 9037,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e539936edf89778b567f,58fa233c916edf7c198b4972",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 19,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bc804c5716de1a94f8b80ba",
                            "product_name": "蒙牛真巴氏鲜牛奶 180ml/包",
                            "name": "蒙牛真巴氏鲜牛奶 180ml/包",
                            "origin_price": "2.80",
                            "price": "2.80",
                            "vip_price": "",
                            "spec": "巴氏杀菌 袋装鲜乳",
                            "small_image": "https://ddimg.ddxq.mobi/d74f9ec75725e1541953105704.png!maicai.product.list",
                            "category_id": "58fb3a24936edfe5568b58db",
                            "sizes": [],
                            "total_sales": 9008,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb3a24936edfe5568b58db",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 45,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bc59850716de1a94f8b6f43",
                            "product_name": "生鲜宽面（大） 300g/盒",
                            "name": "生鲜宽面（大） 300g/盒",
                            "origin_price": "3.50",
                            "price": "3.50",
                            "vip_price": "",
                            "spec": "手工宽面 嚼在嘴里更有劲",
                            "small_image": "https://ddimg.ddxq.mobi/dec914e66fe9d1539676748492.JPG!maicai.product.list",
                            "category_id": "58fb3b03936edf89778b57e1",
                            "sizes": [],
                            "total_sales": 8892,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e58b936edfe2568b580d,58fb3b03936edf89778b57e1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 1,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bf4ddba716de100468c785f",
                            "product_name": "艺杏鸭血（银荣） 435g/盒",
                            "name": "艺杏鸭血（银荣） 435g/盒",
                            "origin_price": "3.90",
                            "price": "3.90",
                            "vip_price": "",
                            "spec": "火锅里怎么能少了我",
                            "small_image": "https://img.ddimg.mobi/product/bf8c64fb956441543472667365.jpg!maicai.product.list",
                            "category_id": "5b0ff20d06752ead258bbb49",
                            "sizes": [],
                            "total_sales": 8792,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e531936edfe5568b5747,5b0ff20d06752ead258bbb49",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 5,
                                    "type_name": "满赠",
                                    "tag": "满69元赠鸡蛋"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 6,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58ee1d02916edfa54cc9df3d",
                            "product_name": "鲜活味美花蛤 500g",
                            "name": "鲜活味美花蛤 500g",
                            "origin_price": "7.80",
                            "price": "7.80",
                            "vip_price": "",
                            "spec": "鲜嫩可口 味道鲜美",
                            "small_image": "https://img.ddimg.mobi/product/bec8e1249b6c1557746153709.jpg!deliver.product.list",
                            "category_id": "58fa2412916edfd62d8b495b",
                            "sizes": [],
                            "total_sales": 9046,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e568936edfe3568b5738,58fa2412916edfd62d8b495b",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "浓郁蒜香花蛤鲜香",
                                    "好吃到停不下来"
                                ],
                                [
                                    "辣中带鲜口口满足",
                                    "连汤汁都不想放过"
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 15,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59afc4176ec2c438498b45f5",
                            "product_name": "大昌美国粟米粒 200g/袋",
                            "name": "大昌美国粟米粒 200g/袋",
                            "origin_price": "7.80",
                            "price": "7.80",
                            "vip_price": "",
                            "spec": "无需解冻 无需清洗 可直接烹调食用",
                            "small_image": "https://ddimg.ddxq.mobi/5cc519fb57d171504748643856.jpg!maicai.product.list",
                            "category_id": "5a053f42936edf450ca359f5",
                            "sizes": [],
                            "total_sales": 8552,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "5a053f42936edf450ca359f5",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 3,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5bbde452d033a19c678bbf22",
                            "product_name": "安井黄金蛋饺 165g/包",
                            "name": "安井黄金蛋饺 165g/包",
                            "origin_price": "7.90",
                            "price": "7.90",
                            "vip_price": "",
                            "spec": "清脆可口的马蹄入馅 甘甜入味",
                            "small_image": "https://ddimg.ddxq.mobi/202c7fbf0402281539172014931.jpg!maicai.product.list",
                            "category_id": "58fb4076936edfe5568b591a",
                            "sizes": [],
                            "total_sales": 8651,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5b3936edfe3568b5742,58fb4076936edfe5568b591a",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": true,
                            "stock_number": 4,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5a4b463b6ec2c420778b4635",
                            "product_name": "来伊份小米锅巴 78g/袋",
                            "name": "来伊份小米锅巴 78g/袋",
                            "origin_price": "4.90",
                            "price": "4.90",
                            "vip_price": "",
                            "spec": "小米含量高达90% 米香浓郁片片香脆",
                            "small_image": "https://ddimg.ddxq.mobi/0f5f617f1514884411854.jpg!maicai.product.list",
                            "category_id": "5b0ff8c306752edd278bdbe1",
                            "sizes": [],
                            "total_sales": 8852,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "59701e80936edf4f38915857,5b0ff8c306752edd278bdbe1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 29,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58b7bac4916edf1f4dc1ec21",
                            "product_name": "鼎丰料酒王 500ml/瓶",
                            "name": "鼎丰料酒王 500ml/瓶",
                            "origin_price": "5.50",
                            "price": "5.50",
                            "vip_price": "",
                            "spec": "去除腥腻 还提香",
                            "small_image": "https://img.ddimg.mobi/product/8fb970045ec721548094494171.jpg!deliver.product.list",
                            "category_id": "58fb3bc1936edfe4568b58f9",
                            "sizes": [],
                            "total_sales": 8922,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5a1936edf89778b568b,58fb3bc1936edfe4568b58f9",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 26,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5afc1505c0a1eabc6e8b45ba",
                            "product_name": "维达超韧系列纸面巾家庭装 130抽*6/袋",
                            "name": "维达超韧系列纸面巾家庭装 130抽*6/袋",
                            "origin_price": "19.90",
                            "price": "19.90",
                            "vip_price": "",
                            "spec": "人气小S码 3层 130抽 湿水不易破",
                            "small_image": "https://ddimg.ddxq.mobi/562d52ead80ee1532573147955.jpg!maicai.product.list",
                            "category_id": "58f9e5cc936edfe6568b5897",
                            "sizes": [],
                            "total_sales": 8610,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e5cc936edfe6568b5897",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 1,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58bbe3b4936edf98323c766a",
                            "product_name": "香菜 约50g",
                            "name": "香菜 约50g",
                            "origin_price": "1.20",
                            "price": "1.20",
                            "vip_price": "",
                            "spec": "半生爱 小时不爱长大好喜欢",
                            "small_image": "https://img.ddimg.mobi/product/c7cfa4f41f6e31545281584531.jpg!maicai.product.list",
                            "category_id": "58fbf4fb936edf42508b4654",
                            "sizes": [],
                            "total_sales": 9068,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d213936edfe4568b569a,58fbf4fb936edf42508b4654",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 78,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59c0ef6e6ec2c4121f8b4599",
                            "product_name": "汉康卤水老豆腐 380g/盒",
                            "name": "汉康卤水老豆腐 380g/盒",
                            "origin_price": "4.20",
                            "price": "4.20",
                            "vip_price": "",
                            "spec": "盒装干净 本味豆香 久违的淳朴美味",
                            "small_image": "https://img.ddimg.mobi/product/7d93c76f308261558670893918.jpg!deliver.product.list",
                            "category_id": "58fbf508936edfe3568b599f",
                            "sizes": [],
                            "total_sales": 8997,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9d233936edfe3568b5655,58fbf508936edfe3568b599f",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 20,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "5b6c111dc0a1ea333a8b7968",
                            "product_name": "楚留鲜鲜鹌鹑蛋24枚 200g",
                            "name": "楚留鲜鲜鹌鹑蛋24枚 200g",
                            "origin_price": "9.90",
                            "price": "9.90",
                            "vip_price": "",
                            "spec": "营养丰富 味道鲜美",
                            "small_image": "https://ddimg.ddxq.mobi/c4c87775684a31533809117568.jpg!maicai.product.list",
                            "category_id": "596dd50c936edf052a8f816d",
                            "sizes": [],
                            "total_sales": 8779,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e539936edf89778b567f,596dd50c936edf052a8f816d",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 26,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "58c3a2df936edfad323d47a1",
                            "product_name": "光明莫斯利安酸牛奶 200g*12盒/箱",
                            "name": "光明莫斯利安酸牛奶 200g*12盒/箱",
                            "origin_price": "59.80",
                            "price": "49.90",
                            "vip_price": "",
                            "spec": "经过巴氏杀菌热处理的酸奶（新老包装交替发货）",
                            "small_image": "https://img.ddimg.mobi/product/179c2d79f590a1563869550466.png!deliver.product.list",
                            "category_id": "58fb39fe936edfe4568b58ad",
                            "sizes": [],
                            "total_sales": 8991,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e574936edfe4568b5789,58fb39fe936edfe4568b58ad",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "巴士杀菌低温消毒",
                                    "营养健康益生菌发酵"
                                ],
                                [
                                    "来自长寿村的秘密",
                                    "酸奶我爱莫斯利安"
                                ]
                            ],
                            "activity": [
                                {
                                    "type": 6,
                                    "type_name": "特价",
                                    "tag": "精选好货"
                                }
                            ],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 9,
                            "today_stockout": "",
                            "is_booking": 0
                        },
                        {
                            "id": "59196859916edf4a24926d21",
                            "product_name": "顶味龙须面 200g/袋",
                            "name": "顶味龙须面 200g/袋",
                            "origin_price": "2.70",
                            "price": "2.70",
                            "vip_price": "",
                            "spec": "不粘更爽口 丝丝缕缕龙须面",
                            "small_image": "https://ddimg.ddxq.mobi/4cf7212172fb81494837237226.jpg!maicai.product.list",
                            "category_id": "58fb3b03936edf89778b57e1",
                            "sizes": [],
                            "total_sales": 8887,
                            "month_sales": 0,
                            "buy_limit": 0,
                            "mark_discount": 0,
                            "mark_new": 0,
                            "mark_self": 0,
                            "status": 1,
                            "category_path": "58f9e58b936edfe2568b580d,58fb3b03936edf89778b57e1",
                            "type": 0,
                            "stockout_reserved": false,
                            "is_promotion": 0,
                            "sale_point_msg": [
                                [
                                    "",
                                    ""
                                ],
                                [
                                    "",
                                    ""
                                ]
                            ],
                            "activity": [],
                            "is_presale": 0,
                            "presale_delivery_date_display": "",
                            "is_gift": 0,
                            "is_onion": 0,
                            "is_invoice": 1,
                            "sub_list": [],
                            "badge_img": "",
                            "is_vod": false,
                            "stock_number": 22,
                            "today_stockout": "",
                            "is_booking": 0
                        }
                    ]
                }
            ]
        },
        "server_time": 1564798583
    });
});

module.exports = router;