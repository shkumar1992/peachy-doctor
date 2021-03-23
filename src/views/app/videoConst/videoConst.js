import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';

import AppointmentCard from '../../../components/cards/AppointmentCard';

import { NavLink } from 'react-router-dom';

import classnames from 'classnames';

import { database } from '../../../helpers/Firebase';

const noAppointments = () => (
  <div className="appointments mb-4">
    <div className="noAppo">
      <img src="/assets/img/logo-white.png" />
      <h2>You don’t have any Video consultations yet.</h2>
      {/* <button className="positive">BOOK NOW</button> */}
    </div>
  </div>
);

const VideoConst = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <h3>
          {/* <IntlMessages id="menu.dashboard" /> */}
          Video consultations
        </h3>
        <Separator className="mb-5" />
        {TabCardExamples()}
        {noAppointments()}

        {/* <div className="appointments mb-4">
          <AppointmentCard
            zero="June 18, 2020 10:20 PM"
            one="Diana Matthew"
            two="diana@example.com

            "
            three="60"
            four="VIEW CONSULTATION"
          />
          <AppointmentCard
            zero="December 18, 2020 10:20 PM"
            one="Diana Matthew"
            two="diana@example.com

            "
            three="60"
            four="VIEW CONSULTATION"
          />
          <AppointmentCard
            zero="November 18, 2020 10:20 PM"
            one="Diana Matthew"
            two="diana@example.com

            "
            three="60"
            four="VIEW CONSULTATION"
          />
        </div> */}
      </Colxx>
    </Row>
  </>
);

const TabCardExamples = () => {
  const [activeSecondTab, setActiveSecondTab] = useState('1');

  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    database.ref('/bookings').on('value', (snapshot) => {
      setBookings(snapshot.val());
      console.log(bookings);
    });
  }, []);

  return (
    <Row>
      <Colxx>
        <Card className="mb-4">
          <CardHeader className="pl-0 pr-0">
            <Nav tabs className=" card-header-tabs  ml-0 mr-0">
              <NavItem className="w-50 text-center">
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeSecondTab === '1',
                    'nav-link': true,
                  })}
                  onClick={() => {
                    setActiveSecondTab('1');
                  }}
                >
                  Upcomming
                </NavLink>
              </NavItem>
              <NavItem className="w-50 text-center">
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeSecondTab === '2',
                    'nav-link': true,
                  })}
                  onClick={() => {
                    setActiveSecondTab('2');
                  }}
                >
                  Past
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>

          <TabContent activeTab={activeSecondTab}>
            <TabPane tabId="1">
              <Row>
                <Colxx sm="12">
                  <CardBody>
                    <div className="appointmentsTabs mb-4">
                      {bookings &&
                        Object.values(bookings)
                          .filter(
                            (booking) =>
                              booking.status === 'accepted' && booking.type == 1
                          )
                          .map(
                            (
                              {
                                date,
                                doctor,
                                location,
                                service,
                                type,
                                selfID,
                                fullName,
                              },
                              index
                            ) => (
                              <AppointmentCard
                                zero={date}
                                one={fullName}
                                two={type}
                                selfID={selfID}
                                three="55"
                                four="VIEW APPOINTMENT"
                                four2="DENY"
                                dn="Dr. Lina Matthew"
                                dt="Dermatologists"
                                dp="(873)-777-6781"
                                da="2401 W 6th St"
                                pl="2505 Railroad St"
                                pp="(762)-655-3578"
                                pa="berry@example.com"
                              />
                            )
                          )}
                    </div>
                  </CardBody>
                </Colxx>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Colxx sm="12">
                  <CardBody>
                    <div className="appointmentsTabs mb-4">
                      <AppointmentCard
                        zero="June 18, 2020 10:20 PM"
                        one="Anthony K Simpson

                        "
                        two="reuben1977@hotmail.com

                        "
                        three="65"
                        four="VIEW APPOINTMENT"
                      />
                    </div>
                  </CardBody>
                </Colxx>
              </Row>
            </TabPane>
          </TabContent>
        </Card>
      </Colxx>
    </Row>
  );
};

export default VideoConst;
