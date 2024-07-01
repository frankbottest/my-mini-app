from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler

async def start(update: Update, context) -> None:
    keyboard = [
        [InlineKeyboardButton("Open Web App", web_app={'url': "https://frankbottest.github.io/my-mini-app/"})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Welcome to my mini app!", reply_markup=reply_markup)

def main() -> None:
    # Используем предоставленный вами токен
    application = Application.builder().token("7221253176:AAFKd3cD0p8Y8DymdLp6eJPTgiGqoCe21DQ").build()
    application.add_handler(CommandHandler("start", start))
    application.run_polling()

if __name__ == '__main__':
    main()
