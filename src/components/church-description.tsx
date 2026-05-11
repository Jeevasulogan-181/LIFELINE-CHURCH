import { useLanguage } from '@/components/language-provider'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Heart, BookOpen, Users } from 'lucide-react'

const descriptions = {
  bengali: {
    title: 'লাইফলাইন চার্চে স্বাগতম',
    content: 'লাইফলাইন চার্চ একটি আধ্যাত্মিক সম্প্রদায় যেখানে আমরা ঈশ্বরের বাক্য শিক্ষা দেই, প্রার্থনা করি এবং একসাথে উপাসনা করি। আমাদের লক্ষ্য হল খ্রিস্টের ভালবাসা ছড়িয়ে দেওয়া এবং সমাজে ইতিবাচক প্রভাব ফেলা।',
    feature1: 'প্রেম',
    feature2: 'শিক্ষা',
    feature3: 'সম্প্রদায়',
  },
  hindi: {
    title: 'लाइफलाइन चर्च में आपका स्वागत है',
    content: 'लाइफलाइन चर्च एक आध्यात्मिक समुदाय है जहां हम परमेश्वर के वचन को सिखाते हैं, प्रार्थना करते हैं और एक साथ आराधना करते हैं। हमारा लक्ष्य मसीह के प्रेम को फैलाना और समाज पर सकारात्मक प्रभाव डालना है।',
    feature1: 'प्रेम',
    feature2: 'शिक्षा',
    feature3: 'समुदाय',
  },
  english: {
    title: 'Welcome to Lifeline Church',
    content: "Lifeline Church is a spiritual community where we teach God's word, pray, and worship together. Our goal is to spread Christ's love and make a positive impact in society. We believe that God has a purpose for every individual's life.",
    feature1: 'Love',
    feature2: 'Teaching',
    feature3: 'Community',
  },
}

const features = [
  { key: 'feature1', icon: Heart, color: 'text-rose-400', glow: 'rgba(244,63,94,0.3)', grad: 'from-rose-500 to-pink-600' },
  { key: 'feature2', icon: BookOpen, color: 'text-cyan-400', glow: 'rgba(8,145,178,0.3)', grad: 'from-cyan-500 to-blue-600' },
  { key: 'feature3', icon: Users, color: 'text-violet-400', glow: 'rgba(124,58,237,0.3)', grad: 'from-violet-500 to-indigo-600' },
]

export function ChurchDescription() {
  const { language } = useLanguage()
  const content = descriptions[language]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-20"
    >
      <div className="relative">
        <div className="absolute -inset-1 rounded-2xl opacity-25"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(8,145,178,0.3))', filter: 'blur(12px)' }} />

        <Card className="heaven-card overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

          <CardContent className="p-8 md:p-14">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-violet-400 mb-4 font-medium">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 heaven-text">{content.title}</h2>
              <p className="text-lg text-white/55 leading-relaxed mb-12">{content.content}</p>

              <div className="flex flex-wrap justify-center gap-5">
                {features.map((f, index) => {
                  const label = content[f.key as keyof typeof content]
                  const Icon = f.icon
                  return (
                    <motion.div
                      key={f.key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3 heaven-pill px-6 py-3 rounded-full group cursor-default"
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${f.grad} flex items-center justify-center`}
                        style={{ boxShadow: `0 4px 14px ${f.glow}` }}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-white/80">{label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}
