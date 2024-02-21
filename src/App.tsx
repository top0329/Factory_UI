import robot from './assets/svg/robot.svg';
import { DefaultBlueprintCard } from './components/Cards/default';
import { MyBlueprintCard } from './components/Cards/mycard';
import { MyOwnBlueprintCard } from './components/Cards/myown';
import { OwnBlueprintCard } from './components/Cards/own';
import { UserBlueprintCard } from './components/Cards/user';
function App() {
  return (
    <div className="flex flex-col gap-2">
      <MyOwnBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        address="0x55d398326f99059ff775485246999027b3197955"
      />

      <OwnBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        address="0x55d398326f99059ff775485246999027b3197955"
      />

      <DefaultBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        mintPrice={0.001}
        mintLimit={100}
      />

      <MyBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        mintPrice={0.001}
        mintLimit={100}
      />

      <UserBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        mintPrice={0.001}
        mintLimit={100}
      />
    </div>
  );
}

export default App;
