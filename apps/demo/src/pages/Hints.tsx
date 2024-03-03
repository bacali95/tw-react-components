import { FC, Fragment, ReactNode } from 'react';

import { Button, Flex, Hint, HintPlacement, HintVariant, Size } from 'tw-react-components';

const sizes: Size[] = ['small', 'medium', 'large'];

const placements: HintPlacement[] = ['top-left', 'bottom-left', 'top-right', 'bottom-right'];

const variants: HintVariant[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

export const Hints: FC = () => {
  const RenderSizes = ({ children }: { children: (size: Size) => ReactNode }) =>
    sizes.map((size, index) => <Fragment key={index}>{children(size)}</Fragment>);

  const RenderPlacements = ({ children }: { children: (variant: HintPlacement) => ReactNode }) =>
    placements.map((variant, index) => <Fragment key={index}>{children(variant)}</Fragment>);

  const RenderVariants = ({ children }: { children: (variant: HintVariant) => ReactNode }) =>
    variants.map((variant, index) => <span key={index}>{children(variant)}</span>);

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
                      <Hint.Dot size={size} placement={placement} variant="green" />
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
                      <Hint.Badge size={size} placement={placement} variant="green">
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
          <Hint.Dot ping variant="green" />
        </Hint>
      </Flex>
      <Flex className="gap-2" direction="column">
        <p className="text-2xl">Variants</p>
        <Flex className="mb-4 !gap-2">
          <RenderVariants>
            {(variant) => (
              <Hint>
                <Button>Hint {variant}</Button>
                <Hint.Dot variant={variant} />
              </Hint>
            )}
          </RenderVariants>
        </Flex>
        <Flex className="gap-12">
          <RenderVariants>
            {(variant) => (
              <Hint>
                <Button>Hint {variant}</Button>
                <Hint.Badge variant={variant}>test</Hint.Badge>
              </Hint>
            )}
          </RenderVariants>
        </Flex>
      </Flex>
    </>
  );
};
