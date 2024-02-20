import robot from './assets/svg/robot.svg';
import { DefaultBlueprintCard } from './components/Cards/default';
// import { MyBlueprintCard } from './components/Cards/mycard';
function App() {
  return (
    <div className="flex flex-col gap-2">
      <DefaultBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        mintPrice={0.001}
        mintLimit={100}
      />

      {/* <MyBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        mintPrice={0.001}
        mintLimit={100}
      /> */}
    </div>
  );
}

export default App;
