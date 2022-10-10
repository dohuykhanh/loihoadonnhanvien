const express = require('express');
const HoaDonRouter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')




HoaDonRouter.post("/", async(req, res) => {
    const VatTu = {
        SanPham: [req.body.hoadon],
        NgayBan: new Date(req.body.NgayBan),
        ChiNhanh: req.body.ChiNhanh,
        Gia: parseInt(req.body.Gia),
        NguoiBan: req.body.NguoiBan
    };
    const result = await db.HoaDon.insertOne(VatTu);

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không thêm được sản phẩm"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Thêm sản phẩm thành công",
            data: VatTu
        })
    }
})


HoaDonRouter.get("/", async(req, res) => {
    const chinhanh = req.params.chinhanh;
    const result = await db.HoaDon.find({

    }).toArray();

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})


HoaDonRouter.get("/h/:hoadoncua", async(req, res) => {
    const chinhanh = req.params.hoadoncua;
    const result = await db.HoaDon.find({
        NguoiBan: chinhanh,
    }).toArray();

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})


module.exports = HoaDonRouter;