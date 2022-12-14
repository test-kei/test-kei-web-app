import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { CONSTANTS } from '../../constants';
import { StoreContext, useMemberService } from '../../store';
import { MemberListItem } from './member-list-item';

const Background = styled.div`
    padding: 50px 20% 10px;
    background-color: ${CONSTANTS.COLORS.white};
    min-height: 100vh;
`;

export const MemberList: React.FC = () => {
    const { store } = useContext(StoreContext);
    const { members } = store.entities;
    const { browseMembers } = useMemberService();

    useEffect(() => {
        (async () => {
            await browseMembers();
        })();
    }, []);

    return (
        <Background>
            {members.all.length > 0 &&
                members.all.map((member, index) => {
                    return (
                        <MemberListItem
                            key={index}
                            member={members.byUUID[member]}
                        />
                    );
                })}
        </Background>
    );
};
