import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { EditorPane } from './components/Editor/EditorPane';
import { PreviewPane } from './components/Preview/PreviewPane';

function App() {
  return (
    <ResumeProvider>
      <Layout>
        <Header />
        <main className="flex h-[calc(100vh-64px)] flex-col lg:flex-row overflow-hidden">
          {/* Left Pane: Editor */}
          <div className="w-full lg:w-1/2 xl:w-2/5 border-r border-border h-full overflow-hidden flex flex-col">
            <EditorPane />
          </div>

          {/* Right Pane: Preview */}
          <div className="w-full lg:w-1/2 xl:w-3/5 h-full overflow-hidden bg-slate-100">
            <PreviewPane />
          </div>
        </main>
      </Layout>
    </ResumeProvider>
  );
}

export default App;
