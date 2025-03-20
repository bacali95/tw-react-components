import type { FC } from 'react';

import { Flex, Resizable } from 'tw-react-components';

export const ResizablePage: FC = () => {
  return (
    <Flex fullHeight fullWidth align="center" justify="center">
      <Resizable.PanelGroup
        direction="horizontal"
        className="max-w-md rounded-lg border md:max-h-[400px] md:min-w-[450px]"
      >
        <Resizable.Panel defaultSize={50}>
          <div className="flex h-[200px] items-center justify-center p-6">
            <span className="font-semibold">One</span>
          </div>
        </Resizable.Panel>
        <Resizable.Handle withHandle />
        <Resizable.Panel defaultSize={50}>
          <Resizable.PanelGroup direction="vertical">
            <Resizable.Panel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </Resizable.Panel>
            <Resizable.Handle withHandle />
            <Resizable.Panel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </Resizable.Panel>
          </Resizable.PanelGroup>
        </Resizable.Panel>
      </Resizable.PanelGroup>
    </Flex>
  );
};
