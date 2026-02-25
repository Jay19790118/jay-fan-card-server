const express = require('express');
const app = express();
const port = 3000;

// 解析JSON请求体
app.use(express.json());

// 模拟数据库（后续可替换为云数据库）
let cardData = [];

// 1. 健康检查接口
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 2. 领取会员卡接口
app.post('/getCard', (req, res) => {
  const { nickname, phone = '' } = req.body;
  if (!nickname) {
    return res.json({ code: -1, msg: '请输入昵称' });
  }
  // 检查是否已领取
  const hasCard = cardData.some(item => item.nickname === nickname);
  if (hasCard) {
    return res.json({ code: 0, msg: '已领取过会员卡', data: { hasCard: true } });
  }
  // 保存数据
  cardData.push({ nickname, phone, createTime: new Date().toLocaleString() });
  res.json({ code: 0, msg: '领取成功', data: { hasCard: true } });
});

// 3. 查询会员卡接口
app.get('/checkCard', (req, res) => {
  const { nickname } = req.query;
  if (!nickname) {
    return res.json({ code: -1, msg: '请输入昵称' });
  }
  const hasCard = cardData.some(item => item.nickname === nickname);
  res.json({ code: 0, data: { hasCard } });
});

// 启动服务
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
