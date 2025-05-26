"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Header from "@/components/header"
import ScrollReveal from "@/components/scroll-reveal"
import PageTransition from "@/components/page-transition"
import ShareButtons from "@/components/share-buttons"

const ClassReportsPage = () => {
  // 現在のURLを取得（クライアントサイドでのみ実行）
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin
    }
    return "https://example.com" // フォールバックURL
  }

  // 目次用のリンク
  const tableOfContents = [
    { id: "first-class", label: "一期会（喜寿の会）" },
    { id: "sixth-class", label: "6回生同期会" },
    { id: "seventh-class", label: "7回生古希同期会" },
    { id: "tenth-class", label: "10回生期生会" },
    { id: "eleventh-class", label: "11友会" },
    { id: "thirteenth-class", label: "13回生同期会" },
    { id: "twentysecond-class", label: "22回生同期会" },
    { id: "twentysixth-class", label: "26回生同期会" },
    { id: "twentyninth-class", label: "29回生同期会" },
  ]

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
            回生だより
          </motion.h1>
          <motion.p
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            各期の同窓生からの活動報告
          </motion.p>
          <motion.div
            className="relative h-[300px] w-full mb-8 overflow-hidden rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Image
              src="/class-reunion-group-photo.png"
              alt="八戸北高校同窓会集合写真"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <h2 className="text-2xl font-bold drop-shadow-md">各期の同窓生からの活動報告</h2>
            </div>
          </motion.div>
          {/* 目次 */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-[#005bac] mb-4 border-b border-gray-200 pb-2">目次</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {tableOfContents.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center"
                  whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
                >
                  <span className="w-2 h-2 bg-[#ffd700] rounded-full mr-2"></span>
                  {item.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <main className="container mx-auto w-[90%] max-w-7xl py-10">
        {/* 一期会（喜寿の会）実施報告 */}
        <ScrollReveal delay={0.1}>
          <article
            id="first-class"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">
                一期会（喜寿の会）実施報告 ①
              </h2>
              <ShareButtons
                title="八戸北高校同窓会 一期会（喜寿の会）実施報告"
                description="一期会（喜寿の会）の実施報告です。"
                url={`${getBaseUrl()}/class-reports#first-class`}
                hashtags={["八戸北高校", "同窓会", "一期会", "喜寿の会"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-[#005bac] mb-2">開催概要</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-semibold">期日:</span> 10月12日 12時 ～ 17時30分
                      </li>
                      <li>
                        <span className="font-semibold">会場:</span> プラザホテル 8F
                      </li>
                      <li>
                        <span className="font-semibold">参加者:</span> 41名（内2名が当日欠席の為、12,000円の費用発生）
                      </li>
                      <li>
                        <span className="font-semibold">写真代:</span>{" "}
                        案内葉書で前回通1枚1,000円と表記したら100円不足が判明し、会から補てん。
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-[#005bac] mb-2">収入</h3>
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">会費</td>
                            <td className="py-2 text-right">5,000円 × 39名 = 195,000 円</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">2次会費</td>
                            <td className="py-2 text-right">2,000円 × 25名 = 50,000 円</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">写真代</td>
                            <td className="py-2 text-right">1,000円 × 34名 = 34,000 円</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">同窓会補助金</td>
                            <td className="py-2 text-right">70,000 円</td>
                          </tr>
                          <tr className="font-semibold">
                            <td className="py-2">計</td>
                            <td className="py-2 text-right">354,000 円</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-[#005bac] mb-2">支出</h3>
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">往復はがき</td>
                            <td className="py-2 text-right">126円 × 115名 = 14,490 円</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">幹事会会議費</td>
                            <td className="py-2 text-right">(3回分／延べ24名分) 12,140 円</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">飲み物</td>
                            <td className="py-2 text-right">(ビール等買い出し) 20,776 円</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">プラザホテル支払い金</td>
                            <td className="py-2 text-right">(料理代41名分他) 275,150 円</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">プラザホテル支払い金</td>
                            <td className="py-2 text-right">(写真代) (34人×1,100円) 37,400 円</td>
                          </tr>
                          <tr className="font-semibold">
                            <td className="py-2">計</td>
                            <td className="py-2 text-right">359,956 円</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#005bac] mb-2">収支</h3>
                    <p className="font-semibold text-right">(一期会通帳の残金から支払い) ▲ 5,956 円</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <p>
                      昨年10月の一期会（41名参加）から今回の「喜寿を祝う会」の間に、幹事2名を含む7名が鬼籍に入り、また、当初23名が居た幹事の参加は病気・体調不良を理由に14名に減りました。また、今回の案内状の返信はがきの文面には、「体調不良」による欠席の記事が多くなりました。要するに、同期のみんなもそのような年齢になっているのが現状でしょう。
                    </p>
                    <p>
                      それでも「喜寿の会」は、北海道・愛知県・東京近郊から7名参加（県外在住者全9名参加）があり、盛会裏に終えることができました。しかも、幹事に対する感謝の弁を聞くと、幹事冥利に尽きます。
                    </p>
                    <p>
                      この参加者全員に喜んで貰えた「喜寿の会」の席上、県外在住者から、「傘寿」の一期会開催を希望されましたが、幹事減少の状況では幹事会の存続は難しく、幹事会では10月12日を以て幹事会を解散することにしています。
                    </p>
                    <p>
                      この提案された「傘寿」の一期会開催をどうすればいいのか、さし当り、その時に動ける旧幹事を中止に、新幹事を加えて対応すればいいのかな、とは思っています。
                    </p>
                    <p>尚、同窓会代議員は戸来元、藤井美智子と古里八十春君（阿部裕造の替わり）の3人がなります。</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="sticky top-24">
                  <Image
                    src="/high-school-reunion.png"
                    alt="一期会（喜寿の会）集合写真"
                    width={300}
                    height={400}
                    className="rounded-lg w-full object-cover shadow-md"
                  />
                  <p className="text-center text-sm mt-2 text-gray-600">一期会（喜寿の会）集合写真</p>
                </motion.div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* 六回生同期会報告 */}
        <ScrollReveal delay={0.2} direction="right">
          <article
            id="sixth-class"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">六回生同期会報告</h2>
              <ShareButtons
                title="八戸北高校同窓会 6回生同期会報告"
                description="八戸北高校6回生同期会を7年ぶりに開催しました。"
                url={`${getBaseUrl()}/class-reports#sixth-class`}
                hashtags={["八戸北高校", "同窓会", "6回生", "同期会"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-[#005bac] mb-2">開催概要</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-semibold">日時:</span> 11月23日
                      </li>
                      <li>
                        <span className="font-semibold">会場:</span> 八戸パークホテル
                      </li>
                      <li>
                        <span className="font-semibold">参加者:</span> 48名（沖縄、京都、三重、千葉など遠方からも参加）
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <p>
                      八戸北高校6回生同期会を7年ぶり 11月23日 八戸パークホテルで開催しました。 八戸市内はもとより、沖縄
                      京都 三重 千葉など遠方からも駆け付け48名が参加しました。
                    </p>
                    <p>3年時の恩師も参加いただき「いつも健康で長生きしてください。」などと激励の言葉を頂きました。</p>
                    <p>
                      一人ずつ近況報告をし、現役で働いている人は業務内容を、定年退職した人は"孫かて"など日頃の生活を報告し合いました。その後は、五十五年前の高校時代に戻り、話は大盛り上がり。あっという間に時間は過ぎ「喜寿（77歳）」に開催予定の同期会で会いましょうとお開きにしました。
                    </p>
                    <p>笑顔で元気で再会できることを楽しみにしております。</p>
                    <p className="text-right italic">（発起人代表＝中里義範）</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="sticky top-24">
                  <Image
                    src="/images/class-6-reunion.png"
                    alt="六回生同期会集合写真"
                    width={300}
                    height={400}
                    className="rounded-lg w-full object-cover shadow-md"
                  />
                  <p className="text-center text-sm mt-2 text-gray-600">2024年11月23日 八戸パークホテルにて撮影</p>
                </motion.div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* 七回生古希同期会報告 */}
        <ScrollReveal delay={0.3} direction="left">
          <article
            id="seventh-class"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">
                八戸北高等学校第７回生 古希同期会 報告
              </h2>
              <ShareButtons
                title="八戸北高校同窓会 第７回生古希同期会報告"
                description="八戸北高等学校第７回生の古希同期会を開催しました。"
                url={`${getBaseUrl()}/class-reports#seventh-class`}
                hashtags={["八戸北高校", "同窓会", "七回生", "古希同期会"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-[#005bac] mb-2">開催概要</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-semibold">日時:</span> 令和6年9月15日（日曜日）正午より
                      </li>
                      <li>
                        <span className="font-semibold">会場:</span> 八戸プラザホテル桜の間
                      </li>
                      <li>
                        <span className="font-semibold">参加者:</span> 54名（県外から10名、市外から5名の参加）
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <p>
                      去る９月１５日（日曜日）正午より、八戸プラザホテル桜の間ににて「八戸北高等学校第７回生
                      古希同期会」を開催しました。今回は先生方の年齢を考慮し同期生のみの案内になりましたが、最後の同期会と銘打って案内した結果、参加者が５４名を数えることができました。
                    </p>
                    <p>
                      会の進行は、物故者への黙とう、卒業アルバムのスライド上映、参加者の近況報告などがありましたが、持病の話、子供や孫の話、亡くなられた最愛の人への思い、等々あり、予定時間をオーバーするほどの盛り上がりでした。
                    </p>
                    <p>最後は、参加者全員で校歌の斉唱をし、会を閉じることとなりました。</p>
                    <p>
                      今回の同期会では、住所不明の方が思わぬルートから住所確認ができたり、北は北海道、南は神奈川県と遠方からも参加していただきました。（県外から１０名、市外から５名の参加者がありました。）
                    </p>
                    <p>幹事の努力によって、住所録をだいぶ修正することができました。</p>
                    <p>
                      別れ際では、たくさんの友から次回の開催への要望があり、今後の検討課題とするということで帰路につきました。
                    </p>
                    <p className="text-right italic">
                      <br />
                      八戸北高等学校第７回生
                      <br />
                      同期会代表 田野岡克衛
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="sticky top-24">
                  <Image
                    src="/images/class-7-reunion.png"
                    alt="七回生古希同期会集合写真"
                    width={300}
                    height={400}
                    className="rounded-lg w-full object-cover shadow-md"
                  />
                  <p className="text-center text-sm mt-2 text-gray-600">令和6年9月15日 八戸プラザホテルにて撮影</p>
                </motion.div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* 十回生期生会報告 */}
        <ScrollReveal delay={0.4} direction="right">
          <article
            id="tenth-class"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">１０回生期生会報告</h2>
              <ShareButtons
                title="八戸北高校同窓会 １０回生期生会報告"
                description="八戸北高１０回生同期会「北十の会」を開催しました。"
                url={`${getBaseUrl()}/class-reports#tenth-class`}
                hashtags={["八戸北高校", "同窓会", "十回生", "北十の会"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-[#005bac] mb-2">開催概要</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-semibold">日時:</span> 10月5日
                      </li>
                      <li>
                        <span className="font-semibold">会場:</span> 六日町ガーデンテラスのサードプレイス
                      </li>
                      <li>
                        <span className="font-semibold">参加者:</span> 22名（関東から4名参加）
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="text-xl font-bold text-center text-[#005bac] mb-4">「北十」は半世紀を超えて</h3>

                    <p>
                      八戸北高１０回生同期会「北十の会」を１０月５日に六日町ガーデンテラスのサードプレイスにて開催いたしました。毎年９月１土曜日に行ってきましたが、コロナ禍で中断。漸く落ち着いた事を機に久し振りのご案内を出したものの、宛先不明や訃報に接する事も。
                    </p>
                    <p>
                      参加者は２２名で、関東からは４名出席してくれました。共通の話題は視力、体力、思考力の衰え、それらを酒の肴に大いに飲んでしゃべって、あっという間のひとときでした。気がつけば学び舎を巣立ってから半世紀、後２年もすれば７０歳ですが、現役で活躍する仲間もいて頼もしい限りです。閉会の後も半数が二次会へと繰り出しました。
                    </p>

                    <h4 className="text-lg font-semibold text-[#005bac] mt-6 mb-2">私達１０回生同期会の歩み</h4>
                    <p>
                      私達１０回生同期会の第一回目は、昭和５８年８月にロー丁大陸飯店にて白取先生を囲んで行いました。平成１７年からは、毎年、主に湊町「喜代志」での開催。今回は会場を変えての開催となりましたが、久し振りに仲間と会えた喜びはひとしおでした。しかし、残念な事に期生会後、参加してくれた仲間の訃報を知りました。願わくは皆さん「会いたい時、会えるうちに、会いましょう」
                    </p>
                    <p>
                      そして、次回も是非、元気にご参加ください。また、これまで事務を担当してきましたが、今回を区切りとして同期生有志へバトンタッチすることになりましたので、ご報告いたします。
                    </p>

                    <p className="text-right italic">村井 功</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="sticky top-24">
                  <Image
                    src="/images/class-10-reunion.png"
                    alt="十回生期生会集合写真"
                    width={300}
                    height={400}
                    className="rounded-lg w-full object-cover shadow-md"
                  />
                  <p className="text-center text-sm mt-2 text-gray-600">10回生「北十の会」集合写真</p>
                </motion.div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* 十一回生友会報告 */}
        <ScrollReveal delay={0.45} direction="left">
          <article
            id="eleventh-class"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">11友会報告</h2>
              <ShareButtons
                title="八戸北高校同窓会 11友会報告"
                description="八戸北高11回生同期会「11友会」を開催しました。"
                url={`${getBaseUrl()}/class-reports#eleventh-class`}
                hashtags={["八戸北高校", "同窓会", "11回生", "11友会"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-[#005bac] mb-2">開催概要</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-semibold">日時:</span> 令和5年12月1日
                      </li>
                      <li>
                        <span className="font-semibold">会場:</span> 八戸プラザホテル
                      </li>
                      <li>
                        <span className="font-semibold">参加者:</span> 69名
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <p>令和5年12月1日、八戸プラザホテルにて、11友会を開催しました。</p>
                    <p>
                      前回はいつだったろう。コロナ禍により、遠い昔のように感じられます。記憶と記録をたどると、還暦記念11友会を開催していました。以来6年ぶりです。その間、11友会開催の声が上がったが、コロナ感染拡大により開催できず、その間に亡くなられた方があったことは残念でした。
                    </p>
                    <p>
                      参加者は69名。乾杯の後はそれぞれ近況報告やテーブルを渡り歩き、大いに盛り上がりました。特にイベントを企画していなかったのですが、サプライズで元気のよい女性司会者が登場、軽妙なトークでクラスごとに自己紹介が始まり更に盛り上がりました。
                    </p>
                    <p>
                      時間のたつのは早いもので、あっという間に記念写真撮影、校歌斉唱での締めとなりました。「次は2年後にやろう」「喜寿の祝いもいいね」いろいろな意見が出ましたが、年齢を重ねると集まる理由に事欠きません。
                    </p>
                    <p>
                      今回の皆への周知方法は、はがきでの開催通知後、申し込みは幹事へメールで連絡、記念写真も希望者へメールで送信としました。以前は、往復はがきでの連絡、記念写真の郵送等の手間がありましたが、スマホの普及により大幅に簡略化できました。
                    </p>
                    <p className="text-right italic">関下 喜美男</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="sticky top-24">
                  <Image
                    src="/images/class-11-reunion.png"
                    alt="11友会集合写真"
                    width={600}
                    height={400}
                    className="rounded-lg w-full object-cover shadow-md"
                  />
                  <p className="text-center text-sm mt-2 text-gray-600">令和5年12月1日 八戸プラザホテルにて撮影</p>
                </motion.div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* 十三回生同期会報告 */}
        <ScrollReveal delay={0.5} direction="right">
          <article
            id="thirteenth-class"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">
                13回生同期会 セカンドライフを楽しもう
              </h2>
              <ShareButtons
                title="八戸北高校同窓会 十三回生同期会報告"
                description="人生百年時代、セカンドライフを楽しもうをテーマに十三回生同期会を開催しました。"
                url={`${getBaseUrl()}/class-reports#thirteenth-class`}
                hashtags={["八戸北高校", "同窓会", "十三回生", "セカンドライフ"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-[#005bac] mb-2">開催概要</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-semibold">日時:</span> 令和6年8月14日
                      </li>
                      <li>
                        <span className="font-semibold">会場:</span> 八戸プラザホテル
                      </li>
                      <li>
                        <span className="font-semibold">参加者:</span> 49名（二次会は35名参加）
                      </li>
                      <li>
                        <span className="font-semibold">テーマ:</span> 「人生百年時代、セカンドライフを楽しもう」
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <p>
                      令和6年8月14日、八戸プラザホテルに於いて13回生同期会を開催しました。5年おきに開催している私たちの同期会ですが、今回は65歳を迎える年の開催となりました。65歳といえば、多くの仲間が定年退職を迎える歳であり、長年払い続けた年金がもらえる歳でもあります。時間的にも、経済的にも少し余裕ができることから、今回の同期会のタイトルは、「人生百年時代、セカンドライフを楽しもう」というテーマに決まりました。
                    </p>
                    <p>
                      多くの参加者を期待してお盆中の開催としましたが、蓋を開けてみると、いつもより3割少ない49名の出席者にとどまりました。それでも、恩師の大瀧先生を迎え、高校時代や近況報告の話で花が咲き、二次会にも三35が参加して大いに盛り上がりました。
                    </p>
                    <p>
                      今回の開催で解ったことは、お盆中は中学校の同期会と重なる率が高く、分散して意外と参加者が少なくなる可能性が高いということです。そして現代の65歳は、社会的にも家庭の中でも、まだまだ中心的な立場にあり、意外と余裕が無いということです。
                    </p>
                    <p>さて、13回生の「楽しいセカンドライフ」はいつになったら味わうことが出来るのでしょうか？</p>
                    <p className="text-right italic">
                      13回生同期会事務局
                      <br />
                      上見 昇
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="sticky top-24">
                  <Image
                    src="/images/class-13-reunion.png"
                    alt="十三回生同期会集合写真"
                    width={300}
                    height={400}
                    className="rounded-lg w-full object-cover shadow-md"
                  />
                  <p className="text-center text-sm mt-2 text-gray-600">令和6年8月14日 八戸プラザホテルにて撮影</p>
                </motion.div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* 二十二回生同期会報告 */}
        <ScrollReveal delay={0.6} direction="left">
          <article
            id="twentysecond-class"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">
                令和６年北高第２２回生同期会詳細
              </h2>
              <ShareButtons
                title="八戸北高校同窓会 第２２回生同期会報告"
                description="５年ぶりとなる第２２回生による同期会を開催しました。"
                url={`${getBaseUrl()}/class-reports#twentysecond-class`}
                hashtags={["八戸北高校", "同窓会", "二十二回生", "55歳"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-[#005bac] mb-2">開催概要</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-semibold">日時:</span> 令和６年８月１１日（日）１８時３０分から
                      </li>
                      <li>
                        <span className="font-semibold">会場:</span> 八戸プラザホテル プラザホール
                      </li>
                      <li>
                        <span className="font-semibold">参加者:</span> 31名
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <p>
                      ５年ぶりとなる第２２回生による同期会を開催。前回はコロナ禍直前２０１９年冬の正月に行いました。
                    </p>
                    <p>
                      その時に夏の開催のほうが集まりやすいのではないかという提案がありましたので、今回は夏に会を企画しました。都合の良い日というのを事前調査もしましたが、実際のところ前回と同様の人数が集まっただけでしたが、住所や姓の修正などの前進もありましたし、何より５５歳の節目を祝うことができたのは、次の６０歳還暦時の開催に向けての試金石となりました。
                    </p>
                    <p className="text-right italic">田中 満</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="sticky top-24">
                  <Image
                    src="/images/class-22-reunion.png"
                    alt="二十二回生同期会集合写真"
                    width={300}
                    height={400}
                    className="rounded-lg w-full object-cover shadow-md"
                  />
                  <p className="text-center text-sm mt-2 text-gray-600">令和6年8月11日 八戸プラザホテルにて撮影</p>
                </motion.div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* 二十六回生同期会報告 */}
        <ScrollReveal delay={0.7} direction="right">
          <article
            id="twentysixth-class"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">
                ５年振りの同期会 - 26回生同期会報告
              </h2>
              <ShareButtons
                title="八戸北高校同窓会 第２６回生同期会報告"
                description="５年振りとなる第２６回生による同期会を開催しました。"
                url={`${getBaseUrl()}/class-reports#twentysixth-class`}
                hashtags={["八戸北高校", "同窓会", "二十六回生", "同期会"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-[#005bac] mb-2">開催概要</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-semibold">日時:</span> 令和７年１月３日
                      </li>
                      <li>
                        <span className="font-semibold">会場:</span> 八戸プラザホテル
                      </li>
                      <li>
                        <span className="font-semibold">参加者:</span> 44名（恩師4名を含む）
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <p>
                      令和７年１月３日、八戸プラザホテルにて、２６回生の同期会を開催しました。コロナ禍により５年振りの開催となりましたが、恩師４人を含む４４人が参加し、久し振りの再会を喜ぶ笑顔が会場を埋め尽くしました。
                    </p>
                    <p>
                      恩師を囲んでの記念撮影や、参加者同士の近況報告が行われ、笑い声が絶えない温かい雰囲気が続きました。高校卒業以来、何十年振りかでの再会もあり、大変有意義な会になったと思います。
                    </p>
                    <p>最後は、参加者全員で校歌を合唱し、再会を誓い合いました。</p>
                    <p className="text-right italic">村本 景</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="sticky top-24">
                  <Image
                    src="/images/class-26-reunion.jpeg"
                    alt="二十六回生同期会集合写真"
                    width={800}
                    height={600}
                    className="rounded-lg w-full object-cover shadow-md"
                  />
                  <p className="text-center text-sm mt-2 text-gray-600">令和7年1月3日 八戸プラザホテルにて撮影</p>
                </motion.div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* 二十九回生同期会報告 */}
        <ScrollReveal delay={0.8} direction="left">
          <article
            id="twentyninth-class"
            className="bg-white p-8 rounded-lg shadow-md mb-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#005bac] border-b-2 border-[#ffd700] pb-2">
                ２９回生同期会報告書 - 人生100年時代の折り返し地点
              </h2>
              <ShareButtons
                title="八戸北高校同窓会 第２９回生同期会報告"
                description="５０歳を迎える第２９回生による同期会を開催しました。"
                url={`${getBaseUrl()}/class-reports#twentyninth-class`}
                hashtags={["八戸北高校", "同窓会", "二十九回生", "50歳", "人生100年時代"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-[#005bac] mb-2">開催概要</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-semibold">日時:</span> 令和７年１月２日
                      </li>
                      <li>
                        <span className="font-semibold">会場:</span> 八戸プラザホテル
                      </li>
                      <li>
                        <span className="font-semibold">参加者:</span> 68名（恩師5名を含む）
                      </li>
                      <li>
                        <span className="font-semibold">恩師:</span>{" "}
                        柴垣博孝先生、会津雅彦先生、川口正人先生、清川和幸先生、小田耕司先生
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <p>
                      令和７年１月２日、八戸プラザホテルにて２９回生の同期会を開催しました。２９回生は４０歳になる年から５年毎に同期会を開催しており、今回が３回目です。前回より多い６８名の同級生に加え、恩師５名（柴垣博孝先生、会津雅彦先生、川口正人先生、清川和幸先生、小田耕司先生）にもご参加いただき、大変賑やかな会となりました。
                    </p>
                    <p>
                      今年で５０歳を迎える２９回生。人生１００年時代のちょうど半分。先生方のお話を伺って、自分のこれからを考えるきっかけとなった参加者も多かったようです。
                    </p>
                    <p className="bg-gray-100 p-4 rounded-lg italic border-l-4 border-[#005bac] my-6">
                      「時間はあっという間に過ぎる。目の前にあるやりたいこと、興味があることは、その時その瞬間に挑戦しよう。トライしなかったことが後悔として一番記憶に残る。まだ身体が動くうちに後悔のないよう生きろ！だから、美味いものから先に喰え！」
                    </p>
                    <p>といった力強い言葉に私たち幹事メンバーも背中を押されました。</p>
                    <p>
                      また、抽選会では当選者のスピーチもあり、大いに盛り上がりました。最後は全員で校歌を斉唱し、思い出深いひとときを共有しました。その後、同ホテル内での二次会にもほとんどの参加者が加わり、さらには3次会、4次会と久々の再会に話が尽きることなくあっという間の時間でした。
                    </p>
                    <p>
                      今回の開催にあたりご参加いただいた皆さま、特に恩師の先生方、また参加できなかったながらもメッセージを寄せてくださった皆さまに心より感謝申し上げます。
                    </p>
                    <p>次回は５年後に再び開催予定です。さらに多くの皆さんとお会いできることを楽しみにしております。</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <motion.div className="mt-8" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K3yvgsuFaSFbTLrAS1EYTsKm6eIr4F.png"
                    alt="二十九回生同期会集合写真"
                    width={800}
                    height={400}
                    className="rounded-lg w-full object-cover shadow-md"
                  />
                  <p className="text-center text-sm mt-2 text-gray-600">
                    29回生同期会集合写真 - 令和７年１月２日開催
                  </p>
                </motion.div>
              </div>
            </div>
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

export default ClassReportsPage
