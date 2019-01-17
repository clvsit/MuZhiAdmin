const Pagination = {
    template: '<div class="page">\n' +
        '            <div class="x-right" style="line-height: 38px;">\n' +
        '                <div class="x-right">共有数据：{{total}} 条</div>\n' +
        '                <div class="x-right" style="margin-right: 20px;">共有：{{count}} 页</div>\n' +
        '            </div>\n' +
        '            <div @click="turnPage($event)">\n' +
        '                <a class="prev" data-type="first">&lt;&lt;</a>\n' +
        '                <a class="num"\n' +
        '                   v-for="item in list"\n' +
        '                   v-text="item"\n' +
        '                   data-page="true"\n' +
        '                ></a>\n' +
        '                <a class="next" data-type="last">&gt;&gt;</a>\n' +
        '            </div>\n' +
        '        </div>',
    data: function () {
        return {
            total: 0,
            current: 1,
            count: 0,
            list: []
        }
    },
    watch: {
        current: function () {
            // 重新计算页码列表
            this.getPageList();

            // 调用父组件的获取数据方法
            this.$emit("get");
        },
        total: function () {
            this.getPageList();
        }
    },
    methods: {
        create: function (count, numberPerPage) {
            this.total = Number(count);
            this.count = Math.ceil(count / Number(numberPerPage));
        },
        /**
         * 获取页码
         */
        getPageList: function () {
            let count = this.count,
                current = this.current,
                listLen = count >= 5 ? 5 : count,
                pageStart = current - 2,
                list = [];

            if (count < 5) {
                pageStart = 1;
            } else {
                if (current < 3) {
                    pageStart = 1;
                } else if (current > count - 2) {
                    pageStart = count - 4;
                }
            }
            for (let i = 0; i < listLen; i++) {
                list[i] = i + pageStart;
            }
            this.list = list;
        },

        /**
         * 跳页操作
         */
        turnPage: function (event) {
            let target = event.target,
                targetText = target.innerText,
                pageDom = document.querySelectorAll(".page .num");

            pageDom.forEach(item => {
                item.classList.remove("current");
            });
            if (target.dataset.page) {
                this.current = Number(targetText);
                this.$nextTick(function () {
                    pageDom = document.querySelectorAll(".page .num");
                    for (let i = 0, len = pageDom.length; i < len; i++) {
                        const item = pageDom[i];

                        if (item.innerText === targetText) {
                            item.classList.add("current");
                            break;
                        }
                    }
                });
            } else {
                if (target.dataset.type === "first") {
                    this.current = 1;
                    pageDom[0].classList.add("current");
                } else if (target.dataset.type === "last") {
                    this.current = this.count;
                    pageDom[pageDom.length - 1].classList.add("current");
                }
            }
        }
    }
};