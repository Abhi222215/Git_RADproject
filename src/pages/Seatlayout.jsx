import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import isoTimeFormat from '../component/lib/isoTimeFormat';

const Seatlayout = () => {
  const maxSeatsPerBooking = 5;

  const { id, date } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showId = searchParams.get('showId');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const isSeatSelected = (seatId) => selectedSeats.includes(seatId)
  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) return prev.filter((s) => s !== seatId)
      if (prev.length >= maxSeatsPerBooking) {
        toast.error(`You can book maximum ${maxSeatsPerBooking} seats only`)
        return prev
      }

      return [...prev, seatId]
    })
  }

  const buildRowSeats = (rowLabel, count) =>
    Array.from({ length: count }, (_, idx) => `${rowLabel}${idx + 1}`)

  const balconyRows = ['K', 'L']
  const getSeatType = (seatId) => (balconyRows.some((row) => seatId.startsWith(row)) ? 'Balcony' : 'Standard')
  const getSeatPrice = (seatId) => (getSeatType(seatId) === 'Balcony' ? 1500 : 1000)

  const seatGroups = [
    {
      id: 'front',
      className: 'lg:col-span-2',
      rows: ['A', 'B'],
    },
    {
      id: 'middle-left',
      className: '',
      rows: ['C', 'D'],
    },
    {
      id: 'middle-right',
      className: '',
      rows: ['E', 'F'],
    },
    {
      id: 'back-left',
      className: '',
      rows: ['G', 'H'],
    },
    {
      id: 'back-right',
      className: '',
      rows: ['I', 'J'],
    },
  ].map((group) => ({
    ...group,
    rows: group.rows.map((row) => ({ row, seats: buildRowSeats(row, 9) })),
  }))

  const balconySeatGroups = [
    {
      id: 'balcony',
      rows: balconyRows,
    },
  ].map((group) => ({
    ...group,
    rows: group.rows.map((row) => ({ row, seats: buildRowSeats(row, 9) })),
  }))

  const SeatButton = ({ seatId }) => {
    const selected = isSeatSelected(seatId)

    return (
      <button
        type='button'
        onClick={() => toggleSeat(seatId)}
        aria-pressed={selected}
        className={`flex h-8 w-8 items-center justify-center rounded-[4px] border text-[11px] font-semibold shadow-[0_0_10px_rgba(248,69,101,0.12)] transition sm:h-9 sm:w-9 sm:text-xs lg:h-10 lg:w-10 lg:text-sm ${
          selected
            ? 'border-(--color-primary) bg-(--color-primary) text-white'
            : 'border-(--color-primary)/35 bg-black/30 text-white/75 hover:border-(--color-primary) hover:bg-(--color-primary)/15 hover:text-white'
        }`}
        title={seatId}
      >
        {seatId}
      </button>
    )
  }

  const getShow = async () => {
    const foundShow = dummyShowsData.find(
      (movie) => String(movie?._id) === String(id) || String(movie?.id) === String(id)
    );
    if (!foundShow) {
      setShow(null);
      return;
    }

    setShow({
      movie: foundShow,
      dateTime: dummyDateTimeData,
    });
  }
  useEffect(() => {
    getShow()

  }, [id])

  const timesForSelectedDate = show?.dateTime?.[date] ?? [];

  useEffect(() => {
    if (!showId) return;
    if (!Array.isArray(timesForSelectedDate) || timesForSelectedDate.length === 0) return;
    const match = timesForSelectedDate.find((t) => String(t?.showId) === String(showId));
    if (match) setSelectedTime(match);
  }, [showId, date, show])

  const checkoutTime = selectedTime;
  const totalAmount = selectedSeats.reduce((total, seatId) => total + getSeatPrice(seatId), 0)

  const handleProceedToCheckout = () => {
    if (!show || selectedSeats.length === 0) return;
    if (!checkoutTime) {
      toast.error('Please select the time')
      return
    }

    const booking = {
      id: `${Date.now()}`,
      movieId: show.movie.id ?? show.movie._id,
      movieTitle: show.movie.title,
      posterPath: show.movie.poster_path,
      date,
      showTime: checkoutTime.time,
      seats: selectedSeats.map((seatId) => ({
        id: seatId,
        type: getSeatType(seatId),
        price: getSeatPrice(seatId),
      })),
      amount: totalAmount,
      isPaid: false,
      bookedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }

    try {
      const savedBookings = JSON.parse(localStorage.getItem('movieBookings') ?? '[]')
      localStorage.setItem('movieBookings', JSON.stringify([booking, ...savedBookings]))
    } catch {
      localStorage.setItem('movieBookings', JSON.stringify([booking]))
    }

    navigate('/mybooking')
  }

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 gap-10'>
      {/*Available Things*/}
      <div className='relative w-56 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-7 h-max md:sticky md:top-30'>
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-(--color-primary)/25 via-white/5 to-white/5' />
        <div className='pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-(--color-primary)/25 blur-3xl' />
        <div className='pointer-events-none absolute -right-28 -bottom-28 h-72 w-72 rounded-full bg-(--color-primary)/10 blur-3xl' />

        <p className='relative text-lg font-semibold tracking-tight'>Available Timings</p>

        <div className='relative mt-5 flex flex-col gap-3'>
          {timesForSelectedDate.map((timeItem, index) => {
            const isSelected = selectedTime?.time === timeItem.time

            return (
              <button
                key={timeItem.showId ?? index}
                type='button'
                onClick={() => setSelectedTime(timeItem)}
                className={`flex w-28 items-center gap-2 rounded-r-xl px-3 py-2 text-left transition ${
                  isSelected
                    ? 'bg-(--color-primary) text-white'
                    : 'text-white/90 hover:bg-white/5'
                }`}
              >
                <Clock className='h-4 w-4' />

                <span className={`text-base font-semibold tracking-wide ${isSelected ? '' : 'text-white/90'}`}>
                  {isoTimeFormat(timeItem.time)}
                </span>
              </button>
            )
          })}
        </div>
        

      </div>

      {/*Seat Layout*/ }
      <div className='flex-1'>
        <p className='text-center text-lg font-semibold'>Select Your Seat</p>
        <div className='mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-white/60'>
          <span>Standard: LKR 1000</span>
          <span>Balcony: LKR 1500</span>
          <span>Selected: {selectedSeats.length}/{maxSeatsPerBooking}</span>
        </div>

        <div className='mx-auto mt-6 w-full max-w-3xl'>
          <div className='relative mx-auto w-full'>
            <img
              src={assets.screenImage}
              alt='Screen'
              className='pointer-events-none mx-auto w-full select-none opacity-90'
              draggable={false}
            />
            <p className='pointer-events-none absolute inset-x-0 top-[100%] -translate-y-1/2 text-center text-xs font-semibold text-white/70'>
              SCREEN SIDE
            </p>
          </div>

          <div className='mt-20 pb-2 md:mt-24'>
            <div className='mx-auto w-full rounded-lg bg-black/30 px-2 py-4 sm:px-0 sm:py-0'>
              <p className='mb-6 text-center text-xs font-semibold uppercase tracking-[0.24em] text-white/40'>
                Standard
              </p>
              <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 xl:gap-x-12 xl:gap-y-12'>
                {seatGroups.map((group) => (
                  <div
                    key={group.id}
                    className={`flex flex-col items-center gap-5 ${group.className}`}
                  >
                    {group.rows.map(({ row, seats }) => (
                      <div key={row} className='grid grid-cols-9 gap-2 sm:gap-3'>
                        {seats.map((seatId) => (
                          <SeatButton key={seatId} seatId={seatId} />
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className='mx-auto my-12 h-px w-full max-w-xl bg-white/10' />

              <p className='mb-6 text-center text-xs font-semibold uppercase tracking-[0.24em] text-(--color-primary)'>
                Balcony
              </p>
              <div className='flex flex-col items-center gap-5'>
                {balconySeatGroups.map((group) => (
                  <div key={group.id} className='flex flex-col items-center gap-5'>
                    {group.rows.map(({ row, seats }) => (
                      <div key={row} className='grid grid-cols-9 gap-2 sm:gap-3'>
                        {seats.map((seatId) => (
                          <SeatButton key={seatId} seatId={seatId} />
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <div className='mx-auto mt-8 max-w-xl rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <p>
                  Selected seats: <span className='font-semibold text-white'>{selectedSeats.join(', ')}</span>
                </p>
                <p className='font-semibold text-white'>LKR {totalAmount}</p>
              </div>
            </div>
          )}

          <button
            type='button'
            onClick={handleProceedToCheckout}
            disabled={selectedSeats.length === 0 || !checkoutTime}
            className='mx-auto mt-12 flex items-center justify-center gap-2 rounded-full bg-(--color-primary) px-10 py-3 text-sm font-semibold text-white transition hover:bg-(--color-primary-dull) disabled:cursor-not-allowed disabled:opacity-60'
          >
            Proceed to checkout
            <ArrowRight className='h-4 w-4' />
          </button>
        </div>
      </div>



    </div>
  ) : (
    <div className='px-6 md:px-16 lg:px-40 py-10'>Loading...</div>
  )
}

export default Seatlayout
