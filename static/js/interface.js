
// 3.1	登录验证码
const RequestLoginCode = "/account/randomCode";
// 3.2	短信验证码
const RegistSmsCode = "/account/smsCode";
//3.3	邮箱验证码
const RegistEmaillCode = "/account/mailCode";
//3.4	用户注册
const Regist = "/account/reg";
// 3.5	登录接口
const Login = "/account/token";
const ResetPasswd = '/account/resPassword';

// 获取标签接口
const FileManageLabel = "/file-manager/manager/initLabelDefine?fileAttr=pic-file";
// 保存标签
const SaveFileLabel = "/file-manager/manager/saveLabel";
// 根据类型插叙对应标签
const GetSingalLabel = "/dic-manager/pid/";
// 获取图片列表
const FileManageList = "/file-manager/manager/queryFiles";
// 文件上传
const FileUpload = "/file-manager/upload/uploadFile";
// 文件批量上传
const BacthUploadFile = "/file-manager/upload/bacthUploadFile";
// 图片删除
const DeleteFile = "/file-manager/manager/";
// 获取用户信息
const UserList = "/sys-manager/user/listAll";
// 获取图片详情
const DetailInfo = "/file-manager/manager/queryFilesAll/";
// 分享
const ShareInfo = "/file-manager/manager/shareFiles";
// 取消分享
const CancleShareInfo = "/file-manager/manager/cancelShareFiles";
// 新增字典
const AddDic= "/dic-manager/add/";
// 上传子文件
const ObjectUploadFile = "/file-manager/upload/objectLabelUpload";
// 获取分享信息
const GetShareInfo = "/file-manager/manager/getShareInfo";

export default {
    RequestLoginCode, RegistSmsCode, RegistEmaillCode, Regist, Login, ResetPasswd, FileManageLabel, SaveFileLabel, GetSingalLabel,
    FileManageList, FileUpload, DeleteFile, BacthUploadFile, UserList, DetailInfo, ShareInfo, CancleShareInfo,
    AddDic, ObjectUploadFile, GetShareInfo
}
