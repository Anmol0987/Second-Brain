import { Button } from "./components/Button"
import { ShareIcon } from "./Icons/ShareIcon"
import { PlusIcon } from "./Icons/PlusIcon"
import { Card } from "./components/Card"

function App() {


  return (
    <>
      <div className=" p-4">
        <div className="flex justify-end gap-4">
          <Button title="Add Content" variant="primary" startIcon={<PlusIcon />} />
          <Button title="Share Brain" variant="secondary" startIcon={<ShareIcon />} />
        </div>

        <div className=" flex gap-4 ">
          <Card title="kzjfblkd" type="twitter" link="https://x.com/radbro/status/1876163621878890600" />
          <Card title="klkl" type="youtube" link="https://www.youtube.com/watch?v=iO_-GtgEYcM&ab_channel=AbhishekYadav" />
        </div>
      </div>

    </>
  )
}

export default App

