<template>
    <textarea id="list" cols="30" rows="20" style="position:absolute;left:550px;"></textarea>
</template>


<script>
export default {
    data() {
        return {}
    },
    created() {

    },
    mounted() {  
        Array.prototype.indexOf = function (item)   //给数组扩展一个indexOf方法
        {
            for (var i = 0; i < this.length; i++)
                if (this[i] == item)
                    return i;
            return -1;
        };

        var Site =  //定义一个棋位类
        {
            Create: function (x, y)  //棋位类的构造函数
            {
                var me = document.createElement("div"); //建一个div对象，将其扩展并封装成棋位。
                document.body.appendChild(me);  //附加到DOM树，实现棋位的呈现。
                me.x = x;   //记录棋位的X坐标
                me.y = y;   //记录棋位的Y坐标
                me.style.left = (x * 40 + 600)+"px";  //设置棋位水平方向的绝对位置
                me.style.top = (y * 40 +100) +"px";   //设置棋位垂直方向的绝对位置
                var s = ((x - 9) % 9 ? 0 : (x - 9) / 9) + 1 + (((y - 9) % 9 ? 0 : (y - 9) / 9) + 1) * 3;    //计算并背景式样
                me._backStyle = "B" + ((s == 4 && (x / 3) % 2 == 1 && (y / 3) % 2 == 1) ? "X" : s);
                me.Fill = this.Fill;    //关联一个填充棋位的方法。
                me.Tight = this.Tight;  //关联计算紧气方法。
                me.Kill = this.Kill;    //关联计算死子方法。
                me.onclick = this.Play; //绑定onclick事件到Play方法。
                me.Fill();  //初始填充空子。
                return me;  //返回棋位对象，其实是一个封装了的div对象。
            },
            Fill: function (dot, going)     //填充棋子的方法
            {
                if (dot == undefined)
                    this.className = this._backStyle    //无子，就设置为背景式样。
                else
                    this.className = (going ? "C" : "D") + dot;
                this.dot = dot;     //保存棋子状态
            },
            Play: function ()    //行棋方法，由onclick事件触发
            {
                if (this.dot == undefined) //无子
                {
                    console.log("11111111");
                    var deads = this.Kill(current ^ 1);   //计算可以杀死的子
                    if (deads.length == 1 && this == rob) return; //打劫状态
                    for (var i = 0; i < deads.length; i++)
                        deads[i].Fill();
                    if (i == 1)
                        rob = deads[0]  //记录打劫位置
                    else if (i > 0 || !this.Tight(current))
                        rob = null  //清打劫位
                    else return;
                    sound.play();       //落子有声！
                    var step = Tracks[Tracks.length - 1];
                    if (step) step.site.Fill(step.site.dot);
                    this.Fill(current, true); //填入当前该填的子
                    Tracks.push(new Step(this, deads));
                    current ^= 1;       //用1来异或，正好反转黑白棋子。

                    var disline = document.getElementById('list');
                    disline.value += ((current ? '黑：' : '白：') + Tracks[Tracks.length - 1].site.x + ' ' + Tracks[Tracks.length - 1].site.y + '\n');
                    disline.scrollTop = disline.scrollHeight;
                
                   setTimeout(function() {
                        var _this = Site.Create(10,12);
                        if(_this.dot == undefined){
                            console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                            var deads = _this.Kill(current ^ 1);   //计算可以杀死的子
                            if (deads.length == 1 && _this == rob) return; //打劫状态
                            console.log("Tracks=======", Tracks,Board);
                            for (var i = 0; i < deads.length; i++)
                                deads[i].Fill();
                            if (i == 1)
                                rob = deads[0]  //记录打劫位置
                            else if (i > 0 || !_this.Tight(current))
                                rob = null  //清打劫位
                            else return;
                            sound.play();       //落子有声！
                            var step = Tracks[Tracks.length - 1];
                            if (step) step.site.Fill(step.site.dot);
                            _this.Fill(current, true); //填入当前该填的子
                            Tracks.push(new Step(_this, deads));
                            current ^= 1;       //用1来异或，正好反转黑白棋子。

                            var disline = document.getElementById('list');
                            disline.value += ((current ? '黑：' : '白：') + Tracks[Tracks.length - 1].site.x + ' ' + Tracks[Tracks.length - 1].site.y + '\n');
                            disline.scrollTop = disline.scrollHeight;
                        }
                   }, 3000);
                   
                };
            },
            Tight: function (dot)   //计算紧气的块
            {
                var life = this.dot == undefined ? this : undefined; //当前位无子则算一口气
                dot = dot == undefined ? this.dot : dot;
                if (dot == undefined) return undefined;
                var block = this.dot == undefined ? [] : [this];
                var i = this.dot == undefined ? 0 : 1;
                var site = this;
                while (true) {
                    for (var dx = -1; dx <= 1; dx++) for (var dy = -1; dy <= 1; dy++) if (!dx ^ !dy) {
                        var link = GetSite(site.x + dx, site.y + dy);
                        if (link)   //有位
                            if (link.dot != undefined)  //有子
                            {
                                if (link.dot == dot && block.indexOf(link) < 0)
                                    block.push(link);
                            }
                            else if (!life)
                                life = link
                            else if (life != link)
                                return undefined;   //如果有两口气以上则无须再算
                    };
                    if (i >= block.length) break;
                    site = block[i];
                    i++;
                };
                return block;   //返回只有一口气的块
            },
            Kill: function (dot)     //计算杀死的子
            {
                var deads = [];
                for (var dx = -1; dx <= 1; dx++) for (var dy = -1; dy <= 1; dy++) if (!dx ^ !dy) {
                    var site = GetSite(this.x + dx, this.y + dy);
                    if (site && (site.dot == dot)) {
                        var block = site.Tight();
                        if (block) deads = deads.concat(block);
                    };
                };
                return deads;   //返回可以提子的死子块
            }
        };

        var Board = new Array(19);  //全局的Board数组，表示棋盘。
        var Tracks = [];    //行棋线索数组，数组元素是Step对象。
        var current = 0;    //当前要下的子，0表示黑子，1表示白子，互相交替。
        var rob = null;     //如果有打劫时，记录打劫位置。
        for (var x = 0; x < 19; x++) {
            Board[x] = new Array(19);
            for (var y = 0; y < 19; y++)
                Board[x][y] = Site.Create(x, y);    //按位置创建棋位对象。
        };
        if (navigator.userAgent.indexOf(' MSIE ') > -1) //为IE浏览器构造声音对象
        {
            var sound = document.body.appendChild(document.createElement("bgsound"));
            sound.play = function () { this.src = "play.wav" };
        }
        else    //为Firefox等其他浏览器构造声音对象
        {
            var sound = document.body.appendChild(document.createElement("span"));
            sound.play = function () { this.innerHTML = "<bgsound src='play.wav'>" };
        };
        document.body.oncontextmenu = function ()     //悔棋事件
        {
            var step = Tracks.pop();
            if (step) {
                step.site.Fill();
                for (var i = 0; i < step.deads.length; i++)
                    step.deads[i].Fill(current);
                step = Tracks[Tracks.length - 1];
                if (step) step.site.Fill(current, true)
                current ^= 1;       //反转黑白棋子。
            };
            return false;   //不弹出菜单。
        };

        function GetSite(x, y)  //从棋盘取棋位的函数，越界不抛出异常。
        {
            if (x >= 0 && x < 19 && y >= 0 && y < 19)
                return Board[x][y];
        };
        function Step(site, deads)   //棋步类，记录每一步棋的状态
        {
            this.site = site;   //记录棋步的位置
            this.deads = deads; //记录被当前棋步杀死的棋子集合
        };

        function PrintWay() //行棋路线
        {
            var str = '', coler = '';
            for (var i = 0; i < Tracks.length; i++) {
                step = Tracks[i];
                coler = (i % 2) ? "白" : "黑";
                str = str + "第" + (i + 1) + "步" + coler + "方 X" + step.site.x + " Y" + step.site.y + " \n";

            }
            alert(str);
        }
        document.body.ondblclick = PrintWay;

        var goes = ["AA0AB0AC1AE0AF1AG1AI0BA0BC1BE0BF0BG1BI0BK1CA1CB1CC1CD0CF0CG1CI0CK1\
DA0DB0DC0DD0DE0DF0DG1DH1DI0DJ0DK1EC1ED1EE1EF1EH1EK1FA1FB1FC1FE0FF1FG1FH1FI0FJ0\
FK1GA1GB0GC1GE0GF0GG0GG0GH0GI0GJ1HA0HB0HC0HD0HE0HI1HJ1IB1IF1JC1JE1JG1",
            "AA0AB0AC0AF1AG1AH0AI0AJ0AK1AM0AO0AP0AR0AS0BA0BB0BF1BG1BJ0BK0BL1BM0BR0BS0CA0CB1\
CC0CD0CG0CH0CI1CJ0CK0CL1CM0CO1CP0CQ0CR1CS0DA1DB1DC0DD0DE1DF1DH1DI0DJ1DK1DL0DN0\
DP1DQ1DR1DS0EB0ED1EE0EG1EI0EK0EM0EO1ER0ES1FB0FC1FE0FF0FG1FN1FP0FR0GA0GF1GH0GJ0\
GL0GR0GS0HC0HD0HF0HI0HK0HM0HN1HP0HQ0HR1IA0IB0IC1ID0IE1IK0IL1IM0IQ1IR0IS0JA0JB0\
JC1JE1JG1JI0JJ1JK1JL0JM1JN1JO0JQ1JR0JS0KA1KC1KD1KE0KG0KI1KJ0KK0KL0KM0KN0KO1KQ0\
KR0KS0LD0LE1LI0LJ1LL0LN1LO0LP0LQ1LR0LS0MD0MG0MI0MJ0MK0ML1MM0MN1MR1MS0NC0NF0NL1\
NO0NQ0NR0NS1OB0OC0OG0OL1OO0PA1PB1PC0PD0PI0PJ0PK0PL1PM0PN0PR0QA0QC1QD0QE1QF1QG1\
QH1QK1QP0RA0RB0RC0RD1RE1RF0RG0RH1RI0RL0SA0SB0SC0SD0SE0SF0SG0SH0SI1SJ1"];

    },
    methods: {

    }
}
</script>


<style>
        .B0 {
            background-image: url('B0.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .B1 {
            background-image: url('B1.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .B2 {
            background-image: url('B2.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .B3 {
            background-image: url('B3.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .B4 {
            background-image: url('B4.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .B5 {
            background-image: url('B5.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .B6 {
            background-image: url('B6.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .B7 {
            background-image: url('B7.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .B8 {
            background-image: url('B8.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .BX {
            background-image: url('BX.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .D0 {
            background-image: url('D0.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .D1 {
            background-image: url('D1.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .C0 {
            background-image: url('C0.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }

        .C1 {
            background-image: url('C1.gif');
            background-size: 100% 100%;
            width: 40px;
            height: 40px;
            position: absolute;
        }
</style>

