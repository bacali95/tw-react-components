import {
  CloudIcon,
  CreditCardIcon,
  GithubIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
} from 'lucide-react';
import { FC } from 'react';

import { Block, Button, Card, DropdownMenu, Flex } from 'tw-react-components';

export const Menus: FC = () => {
  return (
    <Block fullHeight fullWidth>
      <Flex direction="column">
        <Card fullWidth>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button>Dropdown Menu</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-56" align="start">
              <DropdownMenu.Label>Menu</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Group>
                <DropdownMenu.Item>
                  <DropdownMenu.Icon icon={UserIcon} />
                  Profile
                  <DropdownMenu.Shortcut>Ctrl+P</DropdownMenu.Shortcut>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <DropdownMenu.Icon icon={CreditCardIcon} />
                  Billing
                </DropdownMenu.Item>
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
              <DropdownMenu.Group>
                <DropdownMenu.Item>
                  <DropdownMenu.Icon icon={UsersIcon} />
                  <span>Team</span>
                </DropdownMenu.Item>
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger>
                    <DropdownMenu.Icon icon={UserPlusIcon} />
                    <span>Invite users</span>
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent>
                    <DropdownMenu.Item>
                      <DropdownMenu.Icon icon={MailIcon} />
                      <span>Email</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <DropdownMenu.Icon icon={MessageSquareIcon} />
                      <span>Message</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>
                      <DropdownMenu.Icon icon={PlusCircleIcon} />
                      <span>More...</span>
                    </DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
                <DropdownMenu.Item>
                  <DropdownMenu.Icon icon={PlusIcon} />
                  <span>New Team</span>
                  <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
                </DropdownMenu.Item>
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                <DropdownMenu.Icon icon={GithubIcon} />
                <span>GitHub</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu.Icon icon={LifeBuoyIcon} />
                <span>Support</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item disabled>
                <DropdownMenu.Icon icon={CloudIcon} />
                <span>API</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                <DropdownMenu.Icon icon={LogOutIcon} />
                <span>Log out</span>
                <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Group>
                <DropdownMenu.CheckboxItem checked>French</DropdownMenu.CheckboxItem>
                <DropdownMenu.CheckboxItem>English</DropdownMenu.CheckboxItem>
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
              <DropdownMenu.RadioGroup value="en">
                <DropdownMenu.RadioItem value="fr">French</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="en">English</DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu>
        </Card>
      </Flex>
    </Block>
  );
};
