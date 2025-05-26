"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import ScrollReveal from "@/components/scroll-reveal"
import PageTransition from "@/components/page-transition"
import ShareButtons from "@/components/share-buttons"

const GreetingsPage = () => {
  // スクロール位置を制御するためのeffect
  useEffect(() => {
    // URLからハッシュを取得
    const hash = window.location.hash
    if (hash) {
      // 少し遅延させてスクロールを実行（ページ読み込み完了後に実行するため）
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 300)
    }
  }, [])

  // 現在のURLを取得（クライアントサイドでのみ実行）
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin
    }
    return "https://example.com" // フォールバックURL
  }

  // 共通の画像スタイル
  const profileImageStyle = "rounded-full object-cover w-[150px] h-[150px] shadow-md"

  return (
    <PageTransition>
      <Header />

      <motion.div
        className="bg-[#eef7ff] py-10 mt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto w-[90%] max-w-7xl">
          <motion.h1
            className="text-4xl font-bold text-center text-[#005bac] mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ご挨拶
          </motion.h1>
          <motion.p
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            八戸北高校同窓会創立60周年を記念して
          </motion.p>
        </div>
      </motion.div>

      <main className="container mx-auto w-[90%] max-w-7xl py-10">
        {/* 現会長の挨拶 */}
        <ScrollReveal delay={0.1}>
          <article
            id="president"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="md:w-[150px] md:flex-shrink-0"
              >
                <Image
                  src="/presidential-portrait.png"
                  alt="会長写真"
                  width={150}
                  height={150}
                  className={profileImageStyle}
                />
              </motion.div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2 mb-4">会長挨拶</h2>
                  <ShareButtons
                    title="八戸北高校同窓会 会長挨拶"
                    description="一同窓会創立六十周年を迎えて一言御挨拶申し上げます。会員の皆様、お元気でお過ごしでしょうか。"
                    url={`${getBaseUrl()}/greetings#president`}
                    hashtags={["八戸北高校", "同窓会", "60周年"]}
                  />
                </div>
                <p className="text-lg font-semibold mb-2">八戸北高校同窓会 会長 上見 昇</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>会員の皆様、お元気でお過ごしでしょうか。</p>
              <p>
                北高同窓会は今年、創立60年という節目を迎えます。私は13回生ですが今年入会した卒業生は60回生ということで、時の流れの早さを感じます。創立60年を迎えるにあたり、先輩達が築き上げてきたご苦労と、歴代の役員の皆様や代議員の皆様のご協力に改めて感謝を申し上げます。今では毎年行う代議員会や東京支部の同窓会、2年に一度の北酒場の開催、10年毎に開催する記念同窓祭が定着しております。また同期会も毎年複数の期生で活発に行われております。同窓会の会員数も1万9千名余りとなり、市内でも歴史のある大きなネットワークとなっております。
              </p>
              <p>
                しかし課題が無いわけではありません。まずは若い期生の参加率の低さです。40回生以降の同窓会、代議員会の出席率が極めて低い現状です。卒業して繋がりが無くなるのかというと、SNSを使い日頃から繋がっているのです。だから、あえて集まらなくてもいいと感じているのかも知れません。しかしコロナ禍を経験してわかったことは、実際に会うことの感動、会えることの幸せです。是非、同窓会、同期会を今一度見直してみていただきたいと思います。またもう一つは、同窓会のネットワークの活用方法です。親睦を図ることも大切ですが、仕事上の繋がりや、社会奉仕活動にも活用できれば同窓会の存在意義が高まるのではないかと思います。
              </p>
              <p>
                今年の8月10日には同窓会創立60年記念同窓祭を開催いたします。多くの同窓生に集まっていただき、親睦を深め、語り合っていただければ幸いです。そして、新たな次の10年に向かって共に同窓会を育てて行こうではありませんか。皆様のご指導とご協力をお願い申し上げまして、同窓会創立60年にあたってのご挨拶といたします。
              </p>
            </div>

            <motion.div className="mt-8" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Image
                src="/school-reunion-ceremony.png"
                alt="同窓会の様子"
                width={800}
                height={400}
                className="rounded-lg w-full object-cover max-h-[400px]"
              />
            </motion.div>
          </article>
        </ScrollReveal>

        {/* 現校長の挨拶 */}
        <ScrollReveal delay={0.3} direction="left">
          <article
            id="principal"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="md:w-[150px] md:flex-shrink-0"
              >
                <Image
                  src="/images/principal-tajima.jpeg"
                  alt="田島校長写真"
                  width={150}
                  height={150}
                  className={profileImageStyle}
                />
              </motion.div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2 mb-4">
                    校長挨拶「競いて生きん 未来ひらかん」
                  </h2>
                  <ShareButtons
                    title="八戸北高校 校長挨拶「競いて生きん 未来ひらかん」"
                    description="同窓会の皆様、種市朋哉前校長の後を引き継ぎ、今年4月より赴任いたしました田島と申します。"
                    url={`${getBaseUrl()}/greetings#principal`}
                    hashtags={["八戸北高校", "同窓会", "60周年"]}
                  />
                </div>
                <p className="text-lg font-semibold mb-2">八戸北高校 校長 田島 博文</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                同窓会の皆様、種市朋哉前校長の後を引き継ぎ、今年4月より赴任いたしました田島と申します。どうぞよろしくお願いいたします。同窓会の皆様にはこれまで本校の教育活動への物心両面にわたる御支援を賜り、教職員を代表し深く感謝申し上げます。記憶も新しく令和4年度に創立60年の歴史を刻んだ八戸北高校で教育活動にあたることができますことは、誠に光栄であり身の引き締まる思いです。
              </p>
              <p>
                以前にも本校には公務で幾度も訪問する機会はございましたが、赴任し改めて北高の精神的柱とされる「北はきびしく
                きよきもの」が刻まれた石碑を眺めますと、敢えて校訓を設けず、それでも自由が放逸へと流れることのないよう創立時に込めたその思いに心が打たれ、卒業生1万8千9百2名の決然たる烈日の意氣が噴き出すようでもあり圧倒されます。
              </p>
              <p>
                現生徒には、校歌で繰り返される「競いて生きん」を「戦わず、争わず、競い合う」と解し、己と他に向かう二つの問いを立てることを望んでいます。探究心から自身の外へと問いを立てることに比べ、自身に問いを向けることには苦しさを伴います。己に問いを提起することは、自分と周囲を一旦は切り離し途絶を求める行為であるからです。しかしながら、これこそ「北はきびしく」の体現であり、そこから歩みて己と他とのかかわりを見出そうとする営みが「きよきもの」の追究でありましょう。対立の深まりがより強く予感される時代だからこそ、この追究において戦わず争わず勝ち負けのない「競いて生きん」ことを全生徒に望むものです。
              </p>
              <p>
                人生の主語を己に据え自身への問いかけを恒とし、それでも互いは互いを補う存在であることを認め「未来ひらかん」とする精神が養われますよう教育活動を推進して参ります。輝かしく光をかかげ発足60年目を迎えられます北高同窓会の益々の発展を祈念しつつ、今後とも母校に対し御支援を賜りますようお願い申し上げます。
              </p>
            </div>

            <motion.div className="mt-8" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Image
                src="/school-building.png"
                alt="八戸北高校校舎"
                width={800}
                height={400}
                className="rounded-lg w-full object-cover max-h-[400px]"
              />
            </motion.div>
          </article>
        </ScrollReveal>

        {/* 前校長の挨拶 */}
        <ScrollReveal delay={0.4} direction="right">
          <article
            id="former-principal"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="md:w-[150px] md:flex-shrink-0"
              >
                <Image
                  src="/former-principal.png"
                  alt="前校長写真"
                  width={150}
                  height={150}
                  className={profileImageStyle}
                />
              </motion.div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2 mb-4">
                    前校長挨拶「心のとりでのために」
                  </h2>
                  <ShareButtons
                    title="前八戸北高校 校長挨拶「心のとりでのために」"
                    description="青森県立八戸北高等学校同窓会発足六十年をお迎えになったことに心よりお祝い申し上げます。"
                    url={`${getBaseUrl()}/greetings#former-principal`}
                    hashtags={["八戸北高校", "同窓会", "60周年", "心のとりでのために"]}
                  />
                </div>
                <p className="text-lg font-semibold mb-2">前八戸北高校 校長 種市 朋哉</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>　青森県立八戸北高等学校同窓会発足60年をお迎えになったことに心よりお祝い申し上げます。</p>
              <p>
                　旧校舎の正面2階に続く24段の階段、いわゆる「きざはし」が象徴する生徒を中心に置く北高の校風は創立以来不易です。卒業生数は令和6年度末で18,903名に至り、多岐にわたる分野での御活躍と社会への御貢献に対し深く敬意を表するものであります。
              </p>
              <p>
                　「冴えたり 北空」と凛として始まり、「北はきびしく
                清きもの」と力強く、厳かに結ばれる校歌。表面に「北はきびしく
                きよきもの」が、背面に「心のとりでのために」が刻まれた石碑が玄関正面に立っています。4回生の卒業記念として建立されたものです。校訓がないことで何にも束縛されないという消極的な意味での自由でなく、安きに流されず、自己を信頼し、気高き己自身を堅持する言葉として、「心のとりでのために」を自身への戒めの言葉として刻んだものとお聞きしました。
              </p>
              <p>
                　校訓を設けず、自ら主体的に考え行動する人間の育成を標榜した北高。北高の独自性、それは自由。自由とは、他のものに依らず自らをよりどころとする心のありよう。消極的な意味の自由でなく、自らを解放し、解き放たれた自らを自らが制御することまで含めての自由。自己の人生をいかに生きるべきかは自身が決める。それは常に自律を迫られる。「心のとりでのために」とは、一時も気を抜かず厳しく自己に対峙する覚悟。
              </p>
              <p>
                　理想気高き北高で教職人生最後の４年間過ごせたことは私にとって誇りです。在任中、同窓会には物心両面にわたり北高を支えていただきましたことに改めて深く感謝の意を表します。昨年度末をもって北高を離れた私でございますが、心は常に北高に向いております。北高を応援する一人として皆様の御記憶の片隅に置いていただければ幸甚の至りと存じます。
              </p>
              <p>　北高の今後ますますの御発展と同窓生の皆様の御健勝を心より祈念申し上げております。</p>
            </div>

            <motion.div className="mt-8" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Image
                src="/school-monument.png"
                alt="「心のとりでのために」石碑"
                width={800}
                height={400}
                className="rounded-lg w-full object-cover max-h-[400px]"
              />
            </motion.div>
          </article>
        </ScrollReveal>

        {/* 歴代会長の挨拶 */}
        <ScrollReveal delay={0.2} direction="right">
          <article
            id="former-presidents"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">歴代会長挨拶</h2>
              <ShareButtons
                title="八戸北高校同窓会 歴代会長挨拶"
                description="八戸北高校同窓会の歴代会長からのメッセージ"
                url={`${getBaseUrl()}/greetings#former-presidents`}
                hashtags={["八戸北高校", "同窓会", "60周年", "歴代会長"]}
              />
            </div>

            {/* 猪内幸敏氏の挨拶 */}
            <div className="mb-10 border-b border-gray-200 pb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="md:w-[150px] md:flex-shrink-0"
                >
                  <Image
                    src="/former-president-portrait.png"
                    alt="猪内幸敏氏写真"
                    width={150}
                    height={150}
                    className={profileImageStyle}
                  />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#005bac] mb-2">同窓会の歩み</h3>
                  <p className="text-lg font-semibold mb-2">三回生 猪内 幸敏</p>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>
                      同窓会に携わったのは、卒業時に先生から地元にいるので、同窓会を手伝う様に言われたからである。役員もまだ少なく、活動は同窓会総会開催である。会場は三角屋根のの旧生徒会館である。その後役員も増えたので、同窓会総会、期生会、会報、東京支部と部会を設け活動し始めたのである。
                    </p>
                    <p>今後の母校、同窓会の発展を願う。</p>
                  </div>
                </div>
              </div>
              <motion.div className="mt-4" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/old-school-building.png"
                  alt="旧校舎の様子"
                  width={800}
                  height={300}
                  className="rounded-lg w-full object-cover max-h-[300px]"
                />
              </motion.div>
            </div>

            {/* 藤井和人氏の挨拶 */}
            <div className="mb-10 border-b border-gray-200 pb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="md:w-[150px] md:flex-shrink-0"
                >
                  <Image
                    src="/fujii-portrait.png"
                    alt="藤井和人氏写真"
                    width={150}
                    height={150}
                    className={profileImageStyle}
                  />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#005bac] mb-2">八戸北高校同窓会創立60周年記念に添えて</h3>
                  <p className="text-lg font-semibold mb-2">藤井 和人</p>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>八戸北高校同窓会創立60周年 おめでとうございます</p>
                    <p>
                      振り返れば母校が50周年を迎えるまで、同窓会長として十数年にわたり皆様に支えられながら同窓会活動を続けられたことに深く感謝しています。
                    </p>
                    <p>今後とも創立60周年を節目に益々同窓会が発展していくことを祈りながら挨拶といたします。</p>
                  </div>
                </div>
              </div>
              <motion.div className="mt-4" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/50th-anniversary.png"
                  alt="50周年記念式典の様子"
                  width={800}
                  height={300}
                  className="rounded-lg w-full object-cover max-h-[300px]"
                />
              </motion.div>
            </div>

            {/* 前田博氏の挨拶 */}
            <div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="md:w-[150px] md:flex-shrink-0"
                >
                  <Image
                    src="/maeda-hiroshi-portrait.png"
                    alt="前田博氏写真"
                    width={150}
                    height={150}
                    className={profileImageStyle}
                  />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#005bac] mb-2">同窓会が還暦を迎えて</h3>
                  <p className="text-lg font-semibold mb-2">元会長 前田 博</p>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>
                      同窓会の還暦、感慨深いものがあります。母校創立20周年の準備の頃から同窓会に関わりました。当時の同窓会は若く、重責は後援会が担っていたと思いますが、今は後援会と共に学校を支えるほどに成長したと感じています。
                    </p>
                  </div>
                </div>
              </div>
              <motion.div className="mt-4" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/school-anniversary.png"
                  alt="学校周年記念の様子"
                  width={800}
                  height={300}
                  className="rounded-lg w-full object-cover max-h-[300px]"
                />
              </motion.div>
            </div>
          </article>
        </ScrollReveal>

        {/* 東京支部長の挨拶 */}
        <ScrollReveal delay={0.5} direction="left">
          <article
            id="tokyo-branch"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="md:w-[150px] md:flex-shrink-0"
              >
                <Image
                  src="/tokyo-branch-president.png"
                  alt="東京支部長写真"
                  width={150}
                  height={150}
                  className={profileImageStyle}
                />
              </motion.div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2 mb-4">
                    新東京支部長挨拶
                  </h2>
                  <ShareButtons
                    title="八戸北高校同窓会 東京支部長挨拶"
                    description="卒業生の皆さん、同窓会の東京支部長になりました玉川と申します。"
                    url={`${getBaseUrl()}/greetings#tokyo-branch`}
                    hashtags={["八戸北高校", "同窓会", "60周年", "東京支部"]}
                  />
                </div>
                <p className="text-lg font-semibold mb-2">東京支部長 玉川</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>卒業生の皆さん、同窓会の東京支部長になりました玉川と申します。</p>
              <p>
                前任の東京支部長の間さんを始めとする役員の皆様には、東京支部を大いに盛り上げていただき、感謝致します。
              </p>
              <p>
                これまで以上に同窓会を盛り上げられるよう、皆様に協力いただきながら務めて参りますので、よろしくお願いいたします。今年は、6月21日(土)に令和7年度の東京支部同窓会を開催予定でございます。昨年は約100名の北高生が集まり、1回生から新卒業生まで一緒に校歌を歌いました。
              </p>
              <p>
                私の人生には今でも大きく「北高」が明確に影響を及ぼしています。卒業して終わりではない北高の輪を広げていくべく、皆様とお会いできるのを楽しみにしております。
              </p>
            </div>

            <motion.div className="mt-8" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Image
                src="/tokyo-branch-meeting.png"
                alt="東京支部同窓会の様子"
                width={800}
                height={400}
                className="rounded-lg w-full object-cover max-h-[400px]"
              />
            </motion.div>
          </article>
        </ScrollReveal>

        {/* 旧東京支部長の挨拶 */}
        <ScrollReveal delay={0.6} direction="right">
          <article
            id="former-tokyo-branch"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="md:w-[150px] md:flex-shrink-0"
              >
                <Image
                  src="/former-tokyo-branch-president.png"
                  alt="旧東京支部長写真"
                  width={150}
                  height={150}
                  className={profileImageStyle}
                />
              </motion.div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2 mb-4">
                    旧東京支部長挨拶
                  </h2>
                  <ShareButtons
                    title="八戸北高校同窓会 旧東京支部長挨拶"
                    description="北高を愛する先輩方、先生達と巡り逢え幸せな支部長生活でした。"
                    url={`${getBaseUrl()}/greetings#former-tokyo-branch`}
                    hashtags={["八戸北高校", "同窓会", "60周年", "東京支部"]}
                  />
                </div>
                <p className="text-lg font-semibold mb-2">前東京支部長 間</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>北高を愛する先輩方、先生達と巡り逢え幸せな支部長生活でした。</p>
              <p>後輩の部活応援、卒業式は本当に楽しかったです。</p>
              <p>いつも同窓会に集い一緒に校歌を歌ってくれた皆さんに感謝します。</p>
              <p>三宮先輩、高松先輩、和田さん、福田さん、支え続けてくれた皆さんありがとうございました。</p>
            </div>

            <motion.div className="mt-8" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Image
                src="/tokyo-branch-activity.png"
                alt="東京支部活動の様子"
                width={800}
                height={400}
                className="rounded-lg w-full object-cover max-h-[400px]"
              />
            </motion.div>
          </article>
        </ScrollReveal>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-block bg-[#005bac] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#004a8c] hover:scale-105 transition-all duration-300"
          >
            トップページに戻る
          </Link>
        </motion.div>
      </main>

      <footer className="bg-gray-800 text-white py-5 text-center mt-10">
        <div className="container mx-auto">
          <p className="mb-1">八戸北高校同窓会事務局</p>
          <p className="mb-1">お問い合わせ：080-7694-8113 (ショートメールのみ)</p>
          <p>© 2024 八戸北高校同窓会. All Rights Reserved.</p>
        </div>
      </footer>
    </PageTransition>
  )
}

export default GreetingsPage
