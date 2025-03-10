import type { FC } from 'react';

import { Block, Tabs as TabsC } from 'tw-react-components';

export const Tabs: FC = () => {
  const tabs = [
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
    { key: 'tab3', label: 'Tab 3' },
  ];

  return (
    <>
      Tabs
      <TabsC defaultValue={tabs[0].key} className="mx-auto w-[400px]">
        <TabsC.List>
          {tabs.map((tab) => (
            <TabsC.Trigger key={tab.key} value={tab.key}>
              {tab.label}
            </TabsC.Trigger>
          ))}
        </TabsC.List>
        {tabs.map((tab) => (
          <TabsC.Content key={tab.key} value={tab.key}>
            <Block className="rounded-md border p-2 dark:border-slate-700" fullWidth>
              {tab.label}
            </Block>
          </TabsC.Content>
        ))}
      </TabsC>
    </>
  );
};
