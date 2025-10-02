import { useMode } from "../hooks/useMode";
import { useTheme } from "../hooks/useTheme";
import { getContent } from "../utils/content";
import GitHubWidget from "./GitHubWidget";

function SkillCard({ name, categoryTitle, value = 85 }) {
  return (
    <div className="p-5 card-gothic group cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <p className="text-primary font-semibold group-hover:text-accent transition-colors">
          {name}
        </p>
        <span className="badge group-hover:border-accent group-hover:bg-accent/10 transition-all">
          {value}%
        </span>
      </div>
      <div className="health-bar relative overflow-visible">
        <div
          className="health-fill transition-all duration-700 group-hover:brightness-125"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-muted opacity-90 group-hover:opacity-100 transition-opacity">
        {categoryTitle}
      </p>
    </div>
  );
}

export default function SkillsSection() {
  const { mode } = useMode();
  const { theme } = useTheme();
  const content = getContent(mode, theme);
  const skills = content.skills;

  return (
    <section id="skills" className="py-24 bg-base">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="font-gothic text-5xl text-accent distressed-text mb-3">
            {skills.title}
          </h2>
          <p className="text-base text-muted">{skills.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Frontend Skills */}
          {skills.categories.frontend.items.map((skill) => (
            <SkillCard
              key={`frontend-${skill}`}
              name={skill}
              categoryTitle={skills.categories.frontend.title}
              value={Math.floor(Math.random() * 15) + 80}
            />
          ))}

          {/* Backend Skills */}
          {skills.categories.backend.items.map((skill) => (
            <SkillCard
              key={`backend-${skill}`}
              name={skill}
              categoryTitle={skills.categories.backend.title}
              value={Math.floor(Math.random() * 15) + 80}
            />
          ))}

          {/* DevOps Skills */}
          {skills.categories.devops.items.map((skill) => (
            <SkillCard
              key={`devops-${skill}`}
              name={skill}
              categoryTitle={skills.categories.devops.title}
              value={Math.floor(Math.random() * 15) + 75}
            />
          ))}
        </div>

        {/* GitHub Widget */}
        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-sm">
            <GitHubWidget username="saketh-kowtha" />
          </div>
        </div>
      </div>
    </section>
  );
}
