$(document).ready(function () {

    var vm = {

        action :function () {

            $("#click").click(function () {
                var text = {
                    line : $("#line").val()
                }
                $.post("/getText",text,function (val) {
                    console.log("val");
                    console.log(val);
                    $("#showCode").text(val)
                })
            })
        },

        test :function () {
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: 5000,//可选选项，自动滑动
            })
        }
    }
    vm.action();
    vm.test();
})