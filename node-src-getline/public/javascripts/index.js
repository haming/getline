$(document).ready(function () {

    var vm = {

        action :function () {

            $("#click").click(function () {
                var text = {
                    line : $("#line").val()
                }
                $.post("/getText",text,function (val) {
                    console.log(val);
                })
            })
        },
    }



    vm.action();
})