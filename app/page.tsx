import { HeaderGeneral } from "./components/header/HeaderGeneral";
import styles from "./page.module.scss";
import { Footer } from "@/app/components/footer/Footer";

const list = [
  {
    text: 'Добро пожаловать в образцовую студию вокала "Кристалл"! Мы - место, где рождается настоящее музыкальное волшебство и талант расцветает. Наша студия существует с 2010 года и является домом для двух уникальных коллективов: шоу-группы "Тип-топ" и конкурсного состава. Давайте расскажем вам о нашем уникальном мире музыки и искусства.',
    images: ["about2.jpeg", "about3.jpeg"],
  },
  {
    text: '🎶 Шоу-группа "Тип-топ" - это звезды, зажигающие нашу сцену с 2004 года. Мы собрали более 40 талантливых детей и молодых артистов, чей возраст варьируется от 4 до 21 года. Они обучаются сценическому мастерству, вокалу, хореографии и музыкальной грамоте. Наши маленькие звезды не просто выступают, они создают настоящее шоу!',
    images: ["tip-top.jpeg", "crystal-kids.JPG"],
  },
  {
    text: '🌟 Конкурсный состав - это наши молодые претенденты на музыкальные вершины. Они тоже учатся в студии "Кристалл" и могут соревноваться с лучшими. Вместе с нами, они развивают вокальные таланты и радуют нас своими выступлениями.',
    images: ["crystal2.jpeg", "crystal2.JPG"],
  },
  {
    text: "👩‍🏫 Наши педагоги - профессионалы своего дела. У нас вы найдете опытных преподавателей с высшими образованиями в области педагогики и вокала. Они индивидуально работают с каждым учеником, помогая раскрыть его потенциал.",
    images: ["team1.jpeg", "team2.jpeg"],
  },
  {
    text: " 🎤 Наши воспитанники изучают сценическое мастерство, занимаются вокалом, хореографией и музыкальной грамотой. Наши достижения - это выступления на лучших концертных площадках города, области и даже Республики! Мы также активно участвуем в проектах, фестивалях и конкурсах, где доказываем свое мастерство и приносим радость публике.",
    images: ["masha-mic.jpeg", "ulya.jpeg"],
  },
];

const About = () => {
  return (
    <>
      <HeaderGeneral />
      <main>
        <div
          className={styles.banner}
          style={{ backgroundImage: "url(img/banners/banner-crystal-jump.JPG" }}
        >
          <div className={styles.blackShadow}></div>
          <div className={styles.pageName}>Crystal и Тип-топ</div>
        </div>

        <div className={`${styles.wrapperAbout} wrapper`}>
          {list.map((item, key) => {
            return (
              <div className={styles.aboutItem} key={key}>
                <div className={styles.text}>{item.text}</div>
                <div className={styles.imgContainer}>
                  {item.images.map((image: string) => {
                    return (
                      <img src={"/img/about/" + image} alt="" key={image} />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
      </main>
      <Footer />
    </>
  );
};

export default About;
