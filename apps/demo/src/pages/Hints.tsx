import { FC, Fragment, ReactNode } from 'react';

import { Button, Color, Flex, Hint, HintPlacement, Size } from 'tw-react-components';

import { colors } from '../colors';

const sizes: Size[] = ['small', 'medium'];

const placements: HintPlacement[] = ['top-left', 'bottom-left', 'top-right', 'bottom-right'];

export const Hints: FC = () => {
  const RenderSizes = ({ children }: { children: (size: Size) => ReactNode }) =>
    sizes.map((size, index) => <Fragment key={index}>{children(size)}</Fragment>);

  const RenderPlacements = ({ children }: { children: (color: HintPlacement) => ReactNode }) =>
    placements.map((color, index) => <Fragment key={index}>{children(color)}</Fragment>);

  const RenderVariants = ({ children }: { children: (color: Color) => ReactNode }) =>
    colors.map((color, index) => <span key={index}>{children(color)}</span>);

  return (
    <>
      <Flex className="gap-2" direction="column">
        <p className="text-2xl">Dots</p>
        <Flex className="gap-4" direction="column">
          <RenderSizes>
            {(size) => (
              <Flex className="gap-6" align="center">
                <RenderPlacements>
                  {(placement) => (
                    <Hint>
                      <Button>Hint {placement}</Button>
                      <Hint.Dot size={size} placement={placement} color="green" />
                    </Hint>
                  )}
                </RenderPlacements>
              </Flex>
            )}
          </RenderSizes>
        </Flex>
      </Flex>
      <Flex className="gap-6" direction="column">
        <p className="text-2xl">Badges</p>
        <Flex className="gap-8 pl-20" direction="column">
          <RenderSizes>
            {(size) => (
              <Flex className="gap-20" align="center">
                <RenderPlacements>
                  {(placement) => (
                    <Hint>
                      <Button>Hint {placement}</Button>
                      <Hint.Badge size={size} placement={placement} color="green">
                        Badge
                      </Hint.Badge>
                    </Hint>
                  )}
                </RenderPlacements>
              </Flex>
            )}
          </RenderSizes>
        </Flex>
      </Flex>
      <Flex className="gap-2" direction="column">
        <p className="text-2xl">Pinging</p>
        <Hint>
          <Button>Updates</Button>
          <Hint.Dot ping color="green" />
        </Hint>
      </Flex>
      <Flex className="gap-2" direction="column">
        <p className="text-2xl">Colors</p>
        <Flex className="mb-4 gap-2" wrap>
          <RenderVariants>
            {(color) => (
              <Hint>
                <Button className="capitalize">{color}</Button>
                <Hint.Dot color={color} />
              </Hint>
            )}
          </RenderVariants>
        </Flex>
        <Flex className="gap-10" wrap>
          <RenderVariants>
            {(color) => (
              <Hint>
                <Button className="capitalize">{color}</Button>
                <Hint.Badge color={color}>test</Hint.Badge>
              </Hint>
            )}
          </RenderVariants>
        </Flex>
      </Flex>
    </>
  );
};
