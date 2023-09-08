import { FC } from "react";
import { Link } from "react-router-dom";

interface NavLink {
  displayName: string;
  name: string;
  to: string;
}

interface DashboardProps {
  name: string;
  navLinks: NavLink[];
}

const Dashboard: FC<DashboardProps> = ({ name, navLinks }) => {
  return (
    <div>
      <h1>{name}</h1>
      <section>
        {navLinks.map(({ displayName, name, to }, index) => (
          <div key={index} id={name}>
            <Link to={to}>{displayName}</Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
