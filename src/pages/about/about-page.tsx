import { Link } from "react-router-dom";
import me from "../../assets/me.jpg";
import Container from "../../components/ui/container";
import "./about-page.css";

const AboutPage = () => {
  return (
    <div className="about">
      <Container>
        <div className="about__wrapper">
          <div className="about__image">
            <img src={me} alt="Jahongir" />
          </div>

          <div className="about__content">
            <h1 className="about__title">About Me</h1>

            <p className="about__intro">
              I’m Jahongir — a frontend developer focused on building clean,
              performant, and user-centered web applications. I enjoy turning
              complex problems into simple, elegant interfaces.
            </p>

            <section className="about__section">
              <h2>Short About Me</h2>
              <p>
                I’m passionate about continuous improvement, structured
                thinking, and writing maintainable code. I value precision,
                clarity, and performance in everything I build.
              </p>
            </section>

            <section className="about__section">
              <h2>Education</h2>
              <p>
                Background in modern web development with strong focus on
                JavaScript, TypeScript, React, and frontend architecture.
                Constantly learning and refining my technical foundation.
              </p>
            </section>

            <section className="about__section">
              <h2>Work</h2>
              <p>
                Experience building scalable frontend applications, working with
                APIs, managing state effectively, and creating structured UI
                systems. Comfortable with modern tooling and performance
                optimization.
              </p>
            </section>

            <section className="about__section">
              <h2>Hobbies & Interests</h2>
              <p>
                I enjoy reading, solving logical problems, improving my
                technical skills, and following sports. I’m always curious about
                how things work and how they can be optimized.
              </p>
            </section>

            <Link to="/" className="about__home-link">
              ← Back to Home
            </Link>

            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              className="about__home-link"
            >
              RS School React course
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
