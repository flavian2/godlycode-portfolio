import Hero            from '../components/Hero';
import WindIntro       from '../components/divine/WindIntro';
import StatsBar        from '../components/divine/StatsBar';
import MeetTheGods     from '../components/divine/MeetTheGods';
import SacredPortfolio from '../components/divine/SacredPortfolio';
import DivineProcess   from '../components/divine/DivineProcess';
import DivineArsenal   from '../components/divine/DivineArsenal';
import DivineCTA       from '../components/divine/DivineCTA';

const Home = () => (
  <div>
    <Hero />
    <WindIntro />
    <StatsBar />
    <MeetTheGods />
    <SacredPortfolio />
    <DivineProcess />
    <DivineArsenal />
    <DivineCTA />
  </div>
);

export default Home;
