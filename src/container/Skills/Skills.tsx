import { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import type { Experience, Skill } from "../../types";
import "./Skills.scss";

const Skills = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch<Experience[]>(query).then((data) => setExperience(data));
    client.fetch<Skill[]>(skillsQuery).then((data) => setSkills(data));
  }, []);

  return (
    <>
      <h2 className="head-text">Skills &amp; Experience</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="app__skills-exp">
          {experience.map((item) => (
            <motion.div className="app__skills-exp-item" key={item.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{item.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {item.works.map((work) => (
                  <Fragment key={work.name}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tooltip-id={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <Tooltip
                      id={work.name}
                      place="top"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </Tooltip>
                  </Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
