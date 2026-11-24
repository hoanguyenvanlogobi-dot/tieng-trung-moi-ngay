const lists = [
`你好|nǐ hǎo|xin chào
谢谢|xièxie|cảm ơn
再见|zàijiàn|tạm biệt
对不起|duìbuqǐ|xin lỗi
没关系|méi guānxi|không sao
不客气|bú kèqi|không có gì
请|qǐng|xin mời
我|wǒ|tôi
你|nǐ|bạn
他|tā|anh ấy
她|tā|cô ấy
我们|wǒmen|chúng tôi
谁|shéi|ai
什么|shénme|cái gì
哪儿|nǎr|ở đâu
多少|duōshao|bao nhiêu
怎么|zěnme|như thế nào
是|shì|là
有|yǒu|có
在|zài|ở
爱|ài|yêu
喜欢|xǐhuan|thích
想|xiǎng|muốn
会|huì|biết làm, có thể
吃|chī|ăn
喝|hē|uống
买|mǎi|mua
看|kàn|xem
听|tīng|nghe
说|shuō|nói
读|dú|đọc
写|xiě|viết
去|qù|đi
来|lái|đến
回|huí|quay về
叫|jiào|gọi, tên là
认识|rènshi|quen biết
学习|xuéxí|học
工作|gōngzuò|làm việc
睡觉|shuìjiào|đi ngủ
的|de|trợ từ chỉ sở hữu
水|shuǐ|nước
茶|chá|trà
米饭|mǐfàn|cơm
苹果|píngguǒ|táo
书|shū|sách
学校|xuéxiào|trường học
老师|lǎoshī|giáo viên
学生|xuésheng|học sinh
朋友|péngyou|bạn bè
家|jiā|nhà, gia đình
妈妈|māma|mẹ
爸爸|bàba|bố
今天|jīntiān|hôm nay
明天|míngtiān|ngày mai
昨天|zuótiān|hôm qua
现在|xiànzài|bây giờ
星期|xīngqī|tuần, thứ
天气|tiānqì|thời tiết
热|rè|nóng
冷|lěng|lạnh
漂亮|piàoliang|đẹp
高兴|gāoxìng|vui
中国|Zhōngguó|Trung Quốc
汉语|Hànyǔ|tiếng Trung
名字|míngzi|tên
商店|shāngdiàn|cửa hàng
医院|yīyuàn|bệnh viện
钱|qián|tiền
一点儿|yìdiǎnr|một chút`,
`知道|zhīdào|biết
觉得|juéde|cảm thấy, thấy rằng
希望|xīwàng|hy vọng
可以|kěyǐ|có thể, được phép
帮助|bāngzhù|giúp đỡ
告诉|gàosu|nói cho biết
问|wèn|hỏi
回答|huídá|trả lời
等|děng|đợi
找|zhǎo|tìm
给|gěi|đưa, cho
送|sòng|tặng, đưa tiễn
进|jìn|vào
出|chū|ra
到|dào|đến nơi
走|zǒu|đi bộ, rời đi
跑步|pǎobù|chạy bộ
运动|yùndòng|vận động
游泳|yóuyǒng|bơi
旅游|lǚyóu|du lịch
起床|qǐchuáng|thức dậy
休息|xiūxi|nghỉ ngơi
准备|zhǔnbèi|chuẩn bị
开始|kāishǐ|bắt đầu
完|wán|xong
已经|yǐjīng|đã
正在|zhèngzài|đang
一起|yìqǐ|cùng nhau
也|yě|cũng
还|hái|vẫn, còn
再|zài|lại, thêm lần nữa
最|zuì|nhất
非常|fēicháng|rất
可能|kěnéng|có lẽ, có khả năng
因为|yīnwèi|bởi vì
所以|suǒyǐ|cho nên
但是|dànshì|nhưng
虽然|suīrán|mặc dù
为什么|wèishénme|tại sao
时间|shíjiān|thời gian
小时|xiǎoshí|tiếng, giờ
早上|zǎoshang|buổi sáng
晚上|wǎnshang|buổi tối
去年|qùnián|năm ngoái
生日|shēngrì|sinh nhật
房间|fángjiān|phòng
教室|jiàoshì|phòng học
机场|jīchǎng|sân bay
路|lù|đường
手机|shǒujī|điện thoại di động
报纸|bàozhǐ|báo giấy
牛奶|niúnǎi|sữa bò
鸡蛋|jīdàn|trứng gà
西瓜|xīguā|dưa hấu
咖啡|kāfēi|cà phê
面条|miàntiáo|mì sợi
贵|guì|đắt
便宜|piányi|rẻ
快|kuài|nhanh
慢|màn|chậm
近|jìn|gần
远|yuǎn|xa
忙|máng|bận
累|lèi|mệt
新|xīn|mới
晴|qíng|trời quang
阴|yīn|trời âm u
下雪|xià xuě|tuyết rơi
颜色|yánsè|màu sắc`,
`安静|ānjìng|yên tĩnh
办法|bànfǎ|cách, biện pháp
办公室|bàngōngshì|văn phòng
帮忙|bāngmáng|giúp một tay
比较|bǐjiào|khá, so sánh
必须|bìxū|bắt buộc phải
变化|biànhuà|thay đổi
冰箱|bīngxiāng|tủ lạnh
菜单|càidān|thực đơn
参加|cānjiā|tham gia
超市|chāoshì|siêu thị
迟到|chídào|đến muộn
出发|chūfā|xuất phát
打算|dǎsuàn|dự định
带|dài|mang theo
担心|dānxīn|lo lắng
当然|dāngrán|tất nhiên
地铁|dìtiě|tàu điện ngầm
地方|dìfang|nơi, địa điểm
地图|dìtú|bản đồ
锻炼|duànliàn|rèn luyện
发现|fāxiàn|phát hiện
方便|fāngbiàn|thuận tiện
放心|fàngxīn|yên tâm
附近|fùjìn|gần đây, lân cận
干净|gānjìng|sạch sẽ
感冒|gǎnmào|cảm lạnh
关心|guānxīn|quan tâm
国家|guójiā|quốc gia
过去|guòqù|quá khứ, đi qua
害怕|hàipà|sợ
环境|huánjìng|môi trường
见面|jiànmiàn|gặp mặt
健康|jiànkāng|khỏe mạnh, sức khỏe
简单|jiǎndān|đơn giản
解决|jiějué|giải quyết
结束|jiéshù|kết thúc
渴|kě|khát
可爱|kě’ài|đáng yêu
客人|kèrén|khách
口语|kǒuyǔ|khẩu ngữ, kỹ năng nói
练习|liànxí|luyện tập
了解|liǎojiě|hiểu rõ
邻居|línjū|hàng xóm
满意|mǎnyì|hài lòng
马上|mǎshàng|ngay lập tức
明白|míngbai|hiểu
难|nán|khó
努力|nǔlì|cố gắng
爬山|páshān|leo núi
其实|qíshí|thật ra
清楚|qīngchu|rõ ràng
请假|qǐngjià|xin nghỉ
容易|róngyì|dễ
认为|rènwéi|cho rằng
如果|rúguǒ|nếu
声音|shēngyīn|âm thanh
世界|shìjiè|thế giới
舒服|shūfu|thoải mái
突然|tūrán|đột nhiên
同事|tóngshì|đồng nghiệp
图书馆|túshūguǎn|thư viện
完成|wánchéng|hoàn thành
习惯|xíguàn|thói quen, quen với
相信|xiāngxìn|tin tưởng
选择|xuǎnzé|lựa chọn
需要|xūyào|cần
要求|yāoqiú|yêu cầu
音乐|yīnyuè|âm nhạc
应该|yīnggāi|nên
影响|yǐngxiǎng|ảnh hưởng
有名|yǒumíng|nổi tiếng
遇到|yùdào|gặp phải, tình cờ gặp
照顾|zhàogù|chăm sóc
重要|zhòngyào|quan trọng
周末|zhōumò|cuối tuần
最近|zuìjìn|gần đây
作业|zuòyè|bài tập về nhà`,
`不知道|bù zhīdào|không biết
星期五|xīngqīwǔ|thứ Sáu
里面|lǐmiàn|mặt trong, bên trong
服装|fúzhuāng|trang phục
好久不见|hǎojiǔ bú jiàn|lâu rồi không gặp
没问题|méi wèntí|không vấn đề gì
多少钱|duōshao qián|bao nhiêu tiền
请问|qǐngwèn|xin hỏi
我听不懂|wǒ tīng bu dǒng|tôi nghe không hiểu
慢一点儿|màn yìdiǎnr|chậm một chút`
];
const words = lists.flatMap((list, level) => list.split('\n').filter(Boolean).map((line, index) => {
  const [zh, py, vi] = line.split('|');
  return {id: `${level+1}-${index}`, level: level+1, zh, py, vi};
}));
const sentences = [
[1,'Tôi thích uống trà.','我 喜欢 喝 茶','我喜欢喝茶。','Wǒ xǐhuan hē chá.'],
[1,'Hôm nay tôi đi học (đến trường).','今天 我 去 学校','今天我去学校。','Jīntiān wǒ qù xuéxiào.','我 今天 去 学校'],
[1,'Tôi muốn mua một ít táo.','我 想 买 一点儿 苹果','我想买一点儿苹果。','Wǒ xiǎng mǎi yìdiǎnr píngguǒ.'],
[1,'Ngày mai bạn đi đâu?','明天 你 去 哪儿','明天你去哪儿？','Míngtiān nǐ qù nǎr?','你 明天 去 哪儿'],
[1,'Cô ấy là bạn của tôi.','她 是 我 的 朋友','她是我的朋友。','Tā shì wǒ de péngyou.'],
[2,'Tôi đã ăn cơm rồi.','我 已经 吃 米饭 了','我已经吃米饭了。','Wǒ yǐjīng chī mǐfàn le.'],
[2,'Buổi sáng tôi thường chạy bộ.','早上 我 常常 跑步','早上我常常跑步。','Zǎoshang wǒ chángcháng pǎobù.','我 早上 常常 跑步'],
[2,'Chúng ta cùng đi bơi nhé.','我们 一起 去 游泳 吧','我们一起去游泳吧。','Wǒmen yìqǐ qù yóuyǒng ba.'],
[2,'Tôi muốn uống cà phê nhưng tôi không có tiền.','我 想 喝 咖啡 但是 我 没有 钱','我想喝咖啡，但是我没有钱。','Wǒ xiǎng hē kāfēi, dànshì wǒ méiyǒu qián.'],
[3,'Cuối tuần tôi định đi leo núi.','周末 我 打算 去 爬山','周末我打算去爬山。','Zhōumò wǒ dǎsuàn qù páshān.','我 周末 打算 去 爬山'],
[3,'Gần đây có siêu thị không?','附近 有 超市 吗','附近有超市吗？','Fùjìn yǒu chāoshì ma?'],
[3,'Tôi cần luyện nói tiếng Trung.','我 需要 练习 汉语 口语','我需要练习汉语口语。','Wǒ xūyào liànxí Hànyǔ kǒuyǔ.'],
[3,'Gần đây tôi hơi bận.','最近 我 有点儿 忙','最近我有点儿忙。','Zuìjìn wǒ yǒudiǎnr máng.','我 最近 有点儿 忙']
];
sentences.push(
[4,'Cô ấy đã đăng ký thi đúng giờ.','她 按时 报名 参加 考试 了','她按时报名参加考试了。','Tā ànshí bàomíng cānjiā kǎoshì le.'],
[4,'Tôi phụ trách sắp xếp chuyến công tác lần này.','我 负责 安排 这次 出差','我负责安排这次出差。','Wǒ fùzé ānpái zhè cì chūchāi.'],
[4,'Xin hãy điền biểu mẫu cẩn thận.','请 仔细 填写 表格','请仔细填写表格。','Qǐng zǐxì tiánxiě biǎogé.'],
[5,'Chúng ta cần cải thiện hiệu suất làm việc.','我们 需要 提高 工作 效率','我们需要提高工作效率。','Wǒmen xūyào tígāo gōngzuò xiàolǜ.'],
[5,'Xin hãy lưu lại tài liệu này để tham khảo.','请 保存 这份 材料 供 参考','请保存这份材料供参考。','Qǐng bǎocún zhè fèn cáiliào gōng cānkǎo.'],
[5,'Chúng ta nên nắm bắt cơ hội này.','我们 应该 把握 这次 机会','我们应该把握这次机会。','Wǒmen yīnggāi bǎwò zhè cì jīhuì.']
);
