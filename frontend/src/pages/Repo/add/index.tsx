import type { NextPage } from 'next';
import RepoUpload from '@/components/RepoUpload';

const App: NextPage =()=> {

  return (
<div style={{ display: "flex", flexDirection: "column", padding: "20%" }}>
 <RepoUpload />
    </div>
 )
}

export default App