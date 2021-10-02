
const { Telegraf } = require('telegraf')
const Koa = require('koa')
const koaBody = require('koa-body')
const safeCompare = require('safe-compare')



const token = '1964935638:AAF71v3SgtREEqD1MGRNysoR-Qa7l2kdKRo';
const webhook = 'https://c7ad-2402-800-6172-e932-3cea-f322-9f2f-8529.ngrok.io'


const bot = new Telegraf(token);


bot.command('image', (ctx) => ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' }))
bot.command('start', (ctx) => ctx.reply(`Dear ${ctx.message.from.first_name} ${ctx.message.from.last_name}
Cảm ơn bạn đã trở thành thành viên của Magic's Forex.

ID Của Bạn: ${ctx.message.from.id}`))






bot.on('text', (ctx) => {
  // Explicit usage
  ctx.telegram.sendMessage(ctx.message.chat.id, `Cảm ơn bạn đã truy vấn! Vui lòng kiểm tra phần F.A.Q của chúng tôi để biết các câu hỏi thường gặp. Nếu bạn không tìm thấy câu trả lời mà bạn đang tìm kiếm, vui lòng liên hệ với quản trị viên của chúng tôi tại @SpMagics.`)
})




const secretPath = `/telegraf/${bot.secretPathComponent()}`
bot.telegram.setWebhook(webhook + secretPath)


const app = new Koa()
app.use(koaBody())


app.use(async (ctx, next) => {
  if (safeCompare(secretPath, ctx.url)) {
    await bot.handleUpdate(ctx.request.body)
    ctx.status = 200
    return
  }
  return next()
})
app.listen(3000)

