
// 3.1	登录验证码
const RequestLoginCode = "/basic/randomCode";
// 3.2	短信验证码
const RegistSmsCode = "/basic/smsCode";
//3.3	邮箱验证码
const RegistEmaillCode = "/basic/mailCode";
//3.4	用户注册
const Regist = "/basic/reg";
// 3.5	登录接口
const Login = "/basic/token";

const ResetPasswd = '/basic/resPassword';

// 4.1	历史记录
const CodeHistoryList = '/decode/task/list';
// 4.2	历史记录详情
const CodeHistortDetail = "/decode/task/{taskId}/detail";
// 4.3	创建任务
const CodeNew = "/decode/task";
// 4.4	上传任务明细
const CodeUpload = "/decode/task/{taskId}/detail";

const CodeUploadFinish = "/decode/task/{taskId}/end";

export default {
    RequestLoginCode, RegistSmsCode, RegistEmaillCode, Regist, Login, ResetPasswd, CodeHistoryList, CodeHistortDetail, CodeNew, CodeUpload, CodeUploadFinish
}
