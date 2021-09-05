import React from 'react';
import Dashboard from '../pages/Dashboard/index';

import { createStackNavigator } from '@react-navigation/stack';

const DashboardStack = createStackNavigator();

const DashboardRoutes = () => (
    <DashboardStack.Navigator>
        <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    </DashboardStack.Navigator>
);

export default DashboardRoutes;