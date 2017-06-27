<template>
    <div class="page-container">
        <div class="container">
            <div class="text-center fs-xxl">作品案例</div>
            <div class="form-area padding-left-0 padding-right-0">
                <div class="form-row">
                    <label>作品名称（20字以内）<span class="fc-red">*</span></label><br/>
                    <div class="form-field">
                        <input type="text"/>
                    </div>
                </div>
                <div class="form-row">
                    <label>职责（20字以内）<span class="fc-red">*</span></label><br/>
                    <div class="form-field">
                        <input type="text"/>
                    </div>
                </div>
                <div class="form-row">
                    <label>行业<span class="fc-red">*</span></label><br/>
                    <div class="form-field">
                        <sl-select :options="selections.price" labelField="name"></sl-select>
                    </div>
                </div>
                <div class="form-row">
                    <label>作品链接（实际作品链接或作品地址）</label><br/>
                    <div class="form-field">
                        <input type="text"/>
                    </div>
                </div>
                <div class="form-row">
                    <label>作品描述（500字以内）<span class="fc-red">*</span></label><br/>
                    <div class="form-field">
                        <textarea rows="10"></textarea>
                    </div>
                </div>
                <div class="btn-area">
                    <a class="btn btn-theme-round btn-harf">保存</a>
                    <a class="btn btn-gray-d-round btn-harf">取消</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var utils = require('../../common/utils');
    module.exports = {
        data: function () {
            return {
                form: {
                    price: ''
                },
                selections: {
                    type: utils.transformToLV([{id: 0, name: 'test1'}, {id: 2, name: 'test2'}]),
                    price: [{id: 0, name: 'test1'}, {id: 2, name: 'test2'}],
                    who: [{label: 1, value: 'test1'}, {label: 2, value: 'test2'}]
                }
            }
        },
        methods: {},
        created: function () {

        }
    }
</script>