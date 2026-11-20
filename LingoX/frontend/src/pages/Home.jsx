import { useEffect, useState } from "react";
import {
  Flame,
  Zap,
  BookOpen,
  Target,
  Trophy,
  User,
  ArrowRight
} from "lucide-react";

import Quiz from "../components/Quiz";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Statsbar from "../components/Statsbar";
import LessonCard from "../components/LessonCard";

import { courses } from "../data/lessons";
import getSavedValue from "../utils/utils";

function Home() {
  const [activePage, setActivePage] = useState("Learn");

  const [direction, setDirection] = useState(() =>
    getSavedValue("lingox-direction", "en-xh")
  );

  const [xp, setXp] = useState(() =>
    getSavedValue("lingox-xp", 0)
  );

  const [streak] = useState(() =>
    getSavedValue("lingox-streak", 1)
  );

  const [completed, setCompleted] = useState(() =>
    getSavedValue("lingox-completed", [])
  );

  const [activeLesson, setActiveLesson] = useState(null);

  const course = courses[direction];

  useEffect(() => {
    localStorage.setItem("lingox-direction", JSON.stringify(direction));
  }, [direction]);

  useEffect(() => {
    localStorage.setItem("lingox-xp", JSON.stringify(xp));
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("lingox-completed", JSON.stringify(completed));
  }, [completed]);

  function isCompleted(lessonId) {
    return completed.includes(`${direction}-${lessonId}`);
  }

  function isLocked(index) {
    if (index === 0) return false;

    const previousLesson = course.lessons[index - 1];
    console.log(previousLesson)

    return !isCompleted(previousLesson.id);
  }

  function finishLesson(score) {
    if (!activeLesson) return;

    const lessonKey = `${direction}-${activeLesson.id}`;

    if (!completed.includes(lessonKey)) {
      setCompleted((previous) => [...previous, lessonKey]);
      setXp((previous) => previous + score * 10);
    }

    setActiveLesson(null);
  }

  const completedCount = course.lessons.filter((lesson) =>
    isCompleted(lesson.id)
  ).length;

  const progress = Math.round(
    (completedCount / course.lessons.length) * 100
  );

  if (activeLesson) {
    return (
      <Quiz
        lesson={activeLesson}
        onComplete={finishLesson}
        onExit={() => setActiveLesson(null)}
      />
    );
  }

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <Header
          direction={direction}
          setDirection={setDirection}
          xp={xp}
          streak={streak}
        />

        {activePage === "Learn" && (
          <>
            <section className="welcome-section">
              <div>
                <span className="eyebrow">YOUR LEARNING JOURNEY</span>
                <h1>Ready to learn something new?</h1>
                <p>
                  {course.subtitle}. Take one lesson at a time.
                </p>
              </div>

              <div className="welcome-icon">🌍</div>
            </section>

            <section className="stats-grid">
              <Statsbar
                icon={Zap}
                title="Total XP"
                value={xp}
                description="Experience points"
                color="#f4b400"
              />

              <Statsbar
                icon={Flame}
                title="Day streak"
                value={streak}
                description="Keep learning daily"
                color="#ff922b"
              />

              <Statsbar
                icon={BookOpen}
                title="Completed"
                value={completedCount}
                description="Lessons completed"
                color="#58cc02"
              />

              <Statsbar
                icon={Target}
                title="Progress"
                value={`${progress}%`}
                description="Course completion"
                color="#3988e8"
              />
            </section>

            <section className="course-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR COURSE</span>
                  <h2>{course.title}</h2>
                  <p>{course.subtitle}</p>
                </div>

                <div className="course-progress">
                  <strong>{progress}%</strong>
                  <span>Completed</span>
                </div>
              </div>

              <div className="progress-track">
                <div style={{ width: `${progress}%` }} />
              </div>

              <div className="lesson-list">
                {course.lessons.map((lesson, index) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    completed={isCompleted(lesson.id)}
                    locked={isLocked(index)}
                    onClick={() => setActiveLesson(lesson)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {activePage === "Lessons" && (
          <section className="page-section">
            <span className="eyebrow">YOUR CURRICULUM</span>
            <h1>All lessons</h1>
            <p>Explore your available learning activities.</p>

            <div className="lesson-list">
              {course.lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  completed={isCompleted(lesson.id)}
                  locked={isLocked(index)}
                  onClick={() => setActiveLesson(lesson)}
                />
              ))}
            </div>
          </section>
        )}

        {activePage === "Practice" && (
          <section className="empty-page">
            <Target size={45} color="#58cc02" />
            <h1>Practice makes progress!</h1>
            <p>
              Additional vocabulary and revision exercises
              are coming soon.
            </p>
            <button
              className="primary-button"
              onClick={() => setActivePage("Learn")}
            >
              Continue learning <ArrowRight size={18} />
            </button>
          </section>
        )}

        {activePage === "Leaderboard" && (
          <section className="empty-page">
            <Trophy size={45} color="#eab308" />
            <h1>Leaderboard</h1>
            <p>
              Compete with other language learners.
              Rankings are coming soon.
            </p>
          </section>
        )}

        {activePage === "Profile" && (
          <section className="empty-page">
            <User size={45} color="#58cc02" />
            <h1>Your learner profile</h1>
            <p>Total XP earned: {xp}</p>
            <p>Lessons completed: {completedCount}</p>
            <p>Current course: {course.title}</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;